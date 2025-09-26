import React from 'react';
import { useTimezoneStore } from '../store/timezoneStore';
import { PlatformIcon } from './PlatformIcon';
import { ContentTypeIcon } from './ContentTypeIcon';
import { extractEventData, getStatusInfo } from './calendarUtils';
import { EventContentArg } from '@fullcalendar/core';

interface CalendarEventRendererProps {
  eventInfo: EventContentArg;
}

export const CalendarEventRenderer: React.FC<CalendarEventRendererProps> = ({ eventInfo }) => {
  const { formatTimeInTimezone } = useTimezoneStore();
  const { event, view } = eventInfo;

  console.log('ESTE ES UN DEBUG DE EVENT INFO', eventInfo);
  
  const {
    platforms,
    primaryPlatform,
    status,
    contentType,
    hasImage,
    imageUrl,
    fullText
  } = extractEventData(event);

  const time = event.start ? formatTimeInTimezone(event.start) : '';
  const isMonthView = view.type === 'dayGridMonth';
  const statusColor = getStatusInfo(status).color;

  if (isMonthView) {
    return (
      <div style={{ 
        position: 'relative',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: '500',
        color: '#374151',
        width: '100%',
        height: '22px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <div style={{
          width: '4px',
          height: '100%',
          backgroundColor: statusColor,
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
          flexShrink: 0
        }} />
        
        <div style={{ padding: '0 4px', flexShrink: 0 }}>
          <PlatformIcon platform={primaryPlatform} size="10px" />
        </div>
        
        <div style={{ 
          flex: 1,
          fontSize: '10px',
          fontWeight: '500',
          color: '#374151',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          paddingRight: '4px'
        }}>
          {fullText || 'Sin contenido'}
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ 
      position: 'relative',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '4px',
      width: '100%',
      minHeight: '60px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      display: 'flex',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '4px',
        backgroundColor: statusColor,
        flexShrink: 0
      }} />
      
      <div style={{ 
        flex: 1,
        padding: '6px 8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '100%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px'
        }}>
          <div style={{
            display: 'flex',
            gap: '3px',
            alignItems: 'center'
          }}>
            {platforms.map((platform: string, index: number) => (
              <div key={index}>
                <PlatformIcon platform={platform} size="12px" />
              </div>
            ))}
          </div>
          
          <div style={{ 
            fontSize: '9px', 
            color: '#6b7280',
            fontWeight: '500'
          }}>
            {time}
          </div>
        </div>
        
        <div style={{ 
          fontSize: '10px', 
          fontWeight: '400', 
          color: '#374151', 
          lineHeight: '1.2',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          marginBottom: '4px',
          flex: 1
        }}>
          {fullText || 'Sin contenido'}
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {hasImage && (
            imageUrl ? (
              <img
                src={imageUrl}
                alt="Preview"
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '2px',
                  flexShrink: 0,
                  border: '1px solid #e5e7eb',
                  objectFit: 'cover',
                  backgroundColor: '#f3f4f6'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#f3f4f6',
                borderRadius: '2px',
                flexShrink: 0,
                border: '1px solid #e5e7eb'
              }} />
            )
          )}
          
          <div style={{ opacity: 0.7 }}>
            <ContentTypeIcon type={contentType} size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};