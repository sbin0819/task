export const validateDeliveryField = (name: string, value: string): boolean => {
  switch (name) {
    case 'recipientName':
      return value.trim().length > 0;

    case 'recipientPhone':
      return /^(\+82\s)?010-\d{4}-\d{4}$/.test(value.trim());

    case 'recipientAddress':
      return /(?=.*[A-Za-z])(?=.*\d)/.test(value.trim());

    case 'deliveryDueDate':
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) {
        return false;
      }

      const date = new Date(value);
      const [year, month, day] = value.split('-').map(Number);

      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );

    default:
      return true;
  }
};

export const validatePurchaseField = (name: string, value: string): boolean => {
  switch (name) {
    case 'productName':
      return value.trim().length > 0;
    case 'productQuantity':
      return /^\d+$/.test(value) && parseInt(value, 10) > 0;
    case 'purchaseDueDate':
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) {
        return false;
      }

      const date = new Date(value);
      const [year, month, day] = value.split('-').map(Number);

      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );
    default:
      return true;
  }
};
