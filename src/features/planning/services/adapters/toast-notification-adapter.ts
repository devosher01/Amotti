
import toast from 'react-hot-toast';
import { NotificationService } from '../../application/ports/notification-service';

export function createToastNotificationAdapter(): NotificationService {
  return {
    showSuccess(message: string): void {
      toast.success(message, {
        duration: 4000,
        position: 'top-right',
        style: {
          background: '#10B981',
          color: '#fff',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#10B981',
        },
      });
    },

    showError(message: string): void {
      toast.error(message, {
        duration: 6000,
        position: 'top-right',
        style: {
          background: '#EF4444',
          color: '#fff',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#EF4444',
        },
      });
    },

    showInfo(message: string): void {
      toast(message, {
        duration: 4000,
        position: 'top-right',
        icon: 'ℹ️',
        style: {
          background: '#3B82F6',
          color: '#fff',
          fontWeight: '500',
        },
      });
    },

    showWarning(message: string): void {
      toast(message, {
        duration: 5000,
        position: 'top-right',
        icon: '⚠️',
        style: {
          background: '#F59E0B',
          color: '#fff',
          fontWeight: '500',
        },
      });
    }
  };
}