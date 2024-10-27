export const initialDeliveryForm = {
  recipientName: {
    value: '',
    error: false,
    label: '수신자 명',
    placeholder: '수신자 명을 입력하세요.',
    errorMessage: '수신자 명을 입력하세요.',
  },
  recipientPhone: {
    value: '',
    error: false,
    label: '수신자 전화번호',
    placeholder: '전화번호를 입력하세요. (+82 010-1234-5678 or 010-1234-5678)',
    errorMessage: '전화번호 포맷을 확인하세요.',
  },
  recipientAddress: {
    value: '',
    error: false,
    label: '수신자 주소',
    placeholder: '수신자 주소를 입력하세요.',
    errorMessage: '주소 형태가 아닙니다. (텍스트, 숫자 포함 확인)',
  },
  deliveryDueDate: {
    value: '',
    error: false,
    label: 'Due Date',
    placeholder: 'due date를 입력하세요. (yyyy-mm-dd)',
    errorMessage: 'yyyy-mm-dd 형태의 날짜 포맷이어야 합니다.',
  },
};

export const initialPurchaseForm = {
  productName: {
    value: '',
    error: false,
    label: '물품명',
    placeholder: '물품명을 입력하세요.',
    errorMessage: '물품명을 입력하세요.',
  },
  productQuantity: {
    value: '',
    error: false,
    label: '물품갯수',
    placeholder: '물품갯수를 입력하세요.',
    errorMessage: '숫자 형태여야 합니다.',
  },
  purchaseDueDate: {
    value: '',
    error: false,
    label: 'Due Date',
    placeholder: 'due date를 입력하세요. (yyyy-mm-dd)',
    errorMessage: 'yyyy-mm-dd 형태의 날짜 포맷이어야 합니다.',
  },
};
