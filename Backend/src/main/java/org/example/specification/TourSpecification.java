package org.example.specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import java.math.BigDecimal;
import java.util.Date;
import org.example.modal.Tour;
import org.example.modal.TourType;
import org.example.form.TourFilterForm;
import org.example.modal.Calendar;
import org.example.modal.Transport;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestParam;

import ch.qos.logback.core.util.StringUtil;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class TourSpecification {

	public static Specification<Tour> buildWhere(String type, Date date) {
		if (date == null) {
			return null;
		}

		CustomSpecification dateSpec = new CustomSpecification(type, "startDate", date);

		return Specification.where(dateSpec);
	}

	public static Specification<Tour> buildWhere(String type, TourFilterForm tourFilterForm, String departure,
			String destination, Integer tourType, Integer transportId, Date startDate) {
		Specification<Tour> where = null;

		if (tourFilterForm != null && tourFilterForm.getMinBudget() != null) {
			CustomSpecification minBudget = new CustomSpecification(type, "minBudget", tourFilterForm.getMinBudget());
			where = Specification.where(minBudget);
		}

		if (tourFilterForm != null && tourFilterForm.getMaxBudget() != null) {
			CustomSpecification maxBudget = new CustomSpecification(type, "maxBudget", tourFilterForm.getMaxBudget());
			if (where == null) {
				where = Specification.where(maxBudget);
			} else {
				where = where.and(maxBudget);
			}
		}

		if (!StringUtil.isNullOrEmpty(departure)) {
			CustomSpecification departureCondition = new CustomSpecification(type, "departureSlug", departure);
			if (where == null) {
				where = Specification.where(departureCondition);
			} else {
				where = where.and(departureCondition);
			}
		}

		if (!StringUtil.isNullOrEmpty(destination)) {
			CustomSpecification destinationCondition = new CustomSpecification(type, "destinationSlug", destination);
			if (where == null) {
				where = Specification.where(destinationCondition);
			} else {
				where = where.and(destinationCondition);
			}
		}

		if (tourType != null && tourType.toString().trim().length() > 0) {
			CustomSpecification tourTypeCondition = new CustomSpecification(type, "tourType", tourType);
			if (where == null) {
				where = Specification.where(tourTypeCondition);
			} else {
				where = where.and(tourTypeCondition);
			}
		}

		if (transportId != null && transportId.toString().trim().length() > 0) {
			CustomSpecification transportCondition = new CustomSpecification(type, "transportId", transportId);
			if (where == null) {
				where = Specification.where(transportCondition);
			} else {
				where = where.and(transportCondition);
			}
		}

		if (startDate != null) {
			CustomSpecification startDateCondition = new CustomSpecification(type, "startDate", startDate);
			if (where == null) {
				where = Specification.where(startDateCondition);
			} else {
				where = where.and(startDateCondition);
			}
		}
		return where;
	}
}

@RequiredArgsConstructor
class CustomSpecification implements Specification<Tour> {

	private static final long serialVersionUID = 1L;

	@NonNull
	private String type;
	@NonNull
	private String field;
	@NonNull
	private Object value;

	@Override
	public Predicate toPredicate(Root<Tour> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		switch (type.toLowerCase()) {
		case "home_default":
			// Thực hiện join với bảng Calendar
			Join<Tour, Calendar> calendarJoin = root.join("calendar");
			return criteriaBuilder.greaterThanOrEqualTo(calendarJoin.get("startDate"), (Date) value);
		case "filter_tour":
			if (field.equalsIgnoreCase("minBudget")) {
				return criteriaBuilder.greaterThanOrEqualTo(root.get("price"), value.toString());
			}
			if (field.equalsIgnoreCase("maxBudget")) {
				return criteriaBuilder.lessThanOrEqualTo(root.get("price"), value.toString());
			}
			if (field.equalsIgnoreCase("departureSlug")) {
				return criteriaBuilder.like(root.get("departureSlug"), "%" + value.toString() + "%");
			}
			if (field.equalsIgnoreCase("destinationSlug")) {
				return criteriaBuilder.like(root.get("destinationSlug"), "%" + value.toString() + "%");
			}
			if (field.equalsIgnoreCase("tourType")) {
				Join<Tour, TourType> tourTypeJoin = root.join("tourType");
				return criteriaBuilder.equal(tourTypeJoin.get("id"), Integer.valueOf(value.toString()));
			}
			if (field.equalsIgnoreCase("transportId")) {
				Join<Tour, Transport> transportJoin = root.join("transport");
				return criteriaBuilder.equal(transportJoin.get("id"), Integer.valueOf(value.toString()));
			}
			if (field.equalsIgnoreCase("startDate")) {
				Join<Tour, Calendar> calenderJn = root.join("calendar");
				return criteriaBuilder.greaterThanOrEqualTo(calenderJn.get("startDate"), (Date) value);
			}
		default:
			return null;

		}

	}
}
