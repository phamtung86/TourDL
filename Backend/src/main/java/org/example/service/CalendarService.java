package org.example.service;


import org.example.dto.CalendarDTO;
import org.example.modal.Calendar;
import org.example.reponsitory.CalendarReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalendarService implements ICalendarService {
    @Autowired
    private CalendarReponsitory calendarReponsitory;

    //getAll
    @Override
    public List<Calendar> getAllCalendar(){
        return  calendarReponsitory.findAll();
    }

    //CreateCalendarService
    @Override
    public Calendar createNewCalendar(Calendar calendar){
        return calendarReponsitory.save(calendar);

    }
    //FindCalendarbyTourId
    @Override
    public List<Calendar> findCalendarbyTour( String tourID){
        List<Calendar> calendars = new ArrayList<>();
        for(Calendar calendar : getAllCalendar()) {
            if(calendar.getTour().equals(tourID)) {
                calendars.add(calendar);
            }

        }
        return calendars;
    }

    @Override
    public List<CalendarDTO> getExpiredCalendars(){
       List<Calendar> expiredCalendars = calendarReponsitory.getExpiredCalendars();
       List<CalendarDTO> calendarExpiredDTO = new ArrayList<>();
       for(Calendar calendar: expiredCalendars){
           CalendarDTO calendarDTO = new CalendarDTO(calendar);
           calendarExpiredDTO.add(calendarDTO);
       }

       if(calendarExpiredDTO.isEmpty()){
           throw new RuntimeException("Not found expiredCalendars ");
       }
       return calendarExpiredDTO;
    }
    @Override
    public List<CalendarDTO> getCalendarsWithinThreeDaysFromNow(){
        List<Calendar> OneDaysFromNow = calendarReponsitory.getCalendarsWithinOneDaysFromNow();
        List<CalendarDTO> OneCalendarDTOS = new ArrayList<>();
        for (Calendar calendar: OneDaysFromNow){
            CalendarDTO calendarDTO = new CalendarDTO(calendar);
            OneCalendarDTOS.add(calendarDTO);
        }
        if (OneCalendarDTOS.isEmpty()){
            throw new RuntimeException("Not found calendars");
        }
        return OneCalendarDTOS;
    }
    @Override
    public List<CalendarDTO> getCalendarsInCurrentAndNextMonth(){
        List<Calendar> calendarsInCurrentAndNextMonth = calendarReponsitory.getCalendarsInCurrentAndNextMonth();
        List<CalendarDTO> calendarsInCurrentAndNextMonthDTOS = new ArrayList<>();
        for (Calendar calendar : calendarsInCurrentAndNextMonth){
            CalendarDTO calendarDTO = new CalendarDTO(calendar);
            calendarsInCurrentAndNextMonthDTOS.add(calendarDTO);
        }
        if(calendarsInCurrentAndNextMonthDTOS.isEmpty()){
            throw new RuntimeException("Not found calendars");
        }
        return calendarsInCurrentAndNextMonthDTOS;
    }


//    //GetAllStartDate
    @Override
    public List<Date> getAllStartedDate(){
//        List<Date> listStartDate = new ArrayList<>();
//        for (Calendar calendar : getAllCalendar()){
//            listStartDate.add(calendar.getStartDate());
//        }
        return null;
    }

    @Override
    public List<Timestamp> calendarInMonth(int month, int year, String tourId) {
        if(calendarReponsitory.calendarInMonth(month,year,tourId).isEmpty()) throw new RuntimeException("Khong co lich nao trong thang nay!!");
        return calendarReponsitory.calendarInMonth(month,year,tourId);

    }


}
