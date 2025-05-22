// Calendar.tsx - 업데이트된 버전
import {
  formatDate,
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState, useRef, useEffect } from 'react'

import { useSidebar } from '~/contexts/sidebar-context'
import styles from '~/styles/components/calendar.module.css'
import { INITIAL_EVENTS, createEventId } from '~/utils/event'

interface SidebarProps {
  weekendsVisible: boolean
  handleWeekendsToggle: () => void
  currentEvents: EventApi[]
  isOpen: boolean
}

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  const [isViewChanging, setIsViewChanging] = useState(false)
  const { sidebarOpen } = useSidebar()
  const calendarRef = useRef<FullCalendar>(null)

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible)
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Please enter a new title for your event')
    const calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })
    }
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events)
  }

  useEffect(() => {
    if (calendarRef.current) {
      const timer = setTimeout(() => {
        calendarRef.current?.getApi().updateSize()
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [sidebarOpen])

  return (
    <div className='flex flex-col md:flex-row h-[calc(100vh-65px)] bg-gray-50'>
      <div className={`${sidebarOpen ? 'w-full md:w-80' : 'w-0'} transition-all duration-300 bg-white shadow-lg z-10 flex-shrink-0 overflow-hidden`}>
        <Sidebar
          weekendsVisible={weekendsVisible}
          handleWeekendsToggle={handleWeekendsToggle}
          currentEvents={currentEvents}
          isOpen={sidebarOpen}
        />
      </div>
      <div className='flex-1 p-4 overflow-auto'>
        <div className={`h-full ${styles.calendarContainer}`}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={3}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
            height='100%'
            locale='ko'
            buttonText={{
              today: '오늘',
              month: '월별',
              week: '주별',
              day: '일별',
            }}
            dayHeaderFormat={{ weekday: 'short' }}
            titleFormat={{ year: 'numeric', month: 'long' }}
            eventDisplay='block'
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false,
              hour12: false,
            }}
            views={{
              dayGridMonth: {
                dayMaxEventRows: 3,
                titleFormat: { year: 'numeric', month: 'long' },
              },
              timeGridWeek: {
                titleFormat: {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                },
              },
              timeGridDay: {
                titleFormat: {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                },
              },
            }}
            viewDidMount={(info) => {
              const viewEl = info.el
              viewEl.classList.add(styles.fadeIn)
              setIsViewChanging(false)
            }}
            viewWillUnmount={() => {
              setIsViewChanging(true)
            }}
            datesSet={(_dateInfo) => {
              // 뷰 변경 중이 아닐 때만 fade-in 효과 적용 (prev/next 버튼 클릭 시에만)
              if (!isViewChanging) {
                const viewHarness = document.querySelector('.fc-view-harness') as HTMLElement
                if (viewHarness) {
                  viewHarness.classList.remove(styles.fadeIn)
                  viewHarness.style.opacity = '0'

                  // 강제 reflow
                  void viewHarness.offsetHeight

                  setTimeout(() => {
                    viewHarness.classList.add(styles.fadeIn)
                    viewHarness.style.opacity = ''
                  }, 50)
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <div className='p-1 text-xs overflow-hidden'>
      <div className='font-medium truncate'>{eventInfo.event.title}</div>
      {eventInfo.timeText && (
        <div className='text-xs opacity-80'>{eventInfo.timeText}</div>
      )}
    </div>
  )
}

const Sidebar = ({
  weekendsVisible,
  handleWeekendsToggle,
  currentEvents,
  isOpen,
}: SidebarProps) => {
  const { toggleSidebar } = useSidebar()

  if (!isOpen) {
    return null
  }

  return (
    <div className='h-full flex flex-col w-80'>
      <div className='p-4 border-b border-gray-200 flex-shrink-0'>
        <h1 className='text-xl font-bold text-gray-800 mb-4'>캘린더</h1>
        <div className='flex items-center justify-between'>
          <label className='flex items-center cursor-pointer'>
            <div className='relative'>
              <input
                type='checkbox'
                className='sr-only'
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              />
              <div className={`block w-12 h-6 rounded-full ${weekendsVisible ? 'bg-blue-500' : 'bg-gray-300'}`} />
              <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${weekendsVisible ? 'transform translate-x-6' : ''}`} />
            </div>
            <span className='ml-2 text-sm font-medium text-gray-700'>주말 표시</span>
          </label>
          <button
            onClick={toggleSidebar}
            className='md:hidden p-1 text-gray-500 hover:text-gray-700'
          >
            ✕
          </button>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto p-4'>
        <h2 className='text-lg font-semibold text-gray-700 mb-3'>이벤트 목록 ({currentEvents.length})</h2>
        {currentEvents.length === 0 ? (
          <p className='text-sm text-gray-500 text-center py-4'>등록된 이벤트가 없습니다</p>
        ) : (
          <ul className='space-y-2'>
            {currentEvents.map((event) => (
              <SidebarEvent key={event.id} event={event} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

const SidebarEvent = ({ event }: { event: EventApi }) => {
  return (
    <li key={event.id} className='bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100'>
      <div className='flex items-start'>
        <div className='bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-2'>
          {event.start
            ? formatDate(event.start, {
              month: 'short',
              day: 'numeric',
            })
            : ''}
        </div>
        <div className='flex-1'>
          <h3 className='text-sm font-medium text-gray-900 line-clamp-1'>{event.title}</h3>
          {event.start && (
            <p className='text-xs text-gray-500'>
              {formatDate(event.start, {
                hour: '2-digit',
                minute: '2-digit',
              })}
              {event.end && (
                <>
                  {' - '}
                  {formatDate(event.end, {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </li>
  )
}

export default Calendar