package org.example.service;

import org.example.dto.CalendarDTO;
import org.example.modal.Calendar;

import java.sql.Date;
import java.util.List;

public interface ICalendarService {
    List<Calendar> getAllCalendar();
    Calendar createNewCalendar(Calendar calendar);
    List<Calendar> findCalendarbyTour( String tourID);
    List<CalendarDTO> getExpiredCalendars();
    List<CalendarDTO> getCalendarsWithinThreeDaysFromNow();
    List<CalendarDTO> getCalendarsInCurrentAndNextMonth();
    List<Date> getAllStartedDate();
}
