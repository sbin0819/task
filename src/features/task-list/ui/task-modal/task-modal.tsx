// components/TaskModal.tsx
import * as Dialog from '@radix-ui/react-dialog';
import { CheckIcon } from '@radix-ui/react-icons';
import { Button, Flex } from '@radix-ui/themes';
import {
  initialDeliveryForm,
  initialPurchaseForm,
} from 'features/task-list/consts/form';
import {
  validateDeliveryField,
  validatePurchaseField,
} from 'features/task-list/lib/utils';
import { useAtomValue } from 'jotai';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { meAtom } from 'shared/store/me';
import CommonFields from './common-fields';
import FormFields from './form-fields';

export interface FormState {
  reporter: string;
  taskName: string;
  assignee: string;
  taskType: string;
}

export enum TaskType {
  DELIVERY = '\ud0dd\ubc30\uc694\uccad',
  PURCHASE = '\ubb3c\ud488\uad6c\ub9e4',
}

export default function TaskModal() {
  const me = useAtomValue(meAtom);

  const [form, setForm] = useState<FormState>({
    reporter: me?.userName ?? '',
    taskName: '',
    assignee: '',
    taskType: '',
  });
  const [deliveryForm, setDeliveryForm] = useState(initialDeliveryForm);
  const [purchaseForm, setPurchaseForm] = useState(initialPurchaseForm);

  const onCreateTask = () => {
    if (form.taskType === TaskType.DELIVERY) {
      alert('Delivery Task Created');
    } else {
      alert('Purchase Task Created');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDeliveryInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValid = validateDeliveryField(name, value);

    setDeliveryForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof initialDeliveryForm],
        value,
        error: !isValid,
      },
    }));
  };

  const handlePurchaseInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isValid = validatePurchaseField(name, value);
    setPurchaseForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name as keyof typeof initialPurchaseForm],
        value,
        error: !isValid,
      },
    }));
  };

  const resetForms = () => {
    setForm({
      reporter: me?.userName ?? '',
      taskName: '',
      assignee: '',
      taskType: '',
    });
    setDeliveryForm(initialDeliveryForm);
    setPurchaseForm(initialPurchaseForm);
  };

  const createButtonDisabled = useMemo(() => {
    {
      if (!form.taskName || !form.assignee || !form.taskType) {
        return true;
      }

      if (form.taskType === TaskType.DELIVERY) {
        return Object.values(deliveryForm).some(
          (value) => value.error || !value.value
        );
      }

      if (form.taskType === TaskType.PURCHASE) {
        return Object.values(purchaseForm).some(
          (field) => field.error || !field.value
        );
      }

      return false;
    }
  }, [form, deliveryForm, purchaseForm]);

  useEffect(() => {
    if (me?.userName) {
      setForm((prev) => ({ ...prev, reporter: me.userName }));
    }
  }, [me?.userName]);

  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (!open) {
          resetForms();
        }
      }}
    >
      <Dialog.Trigger asChild>
        <Button
          className="h-full bg-teal-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white"
          disabled={me?.userRole === 'Viewer'}
        >
          Create Task
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[90vh] w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow overflow-scroll">
          <Dialog.Title className="m-0 text-2xl font-medium text-mauve12">
            Task 생성
          </Dialog.Title>
          <Flex direction="column" className="mt-10 gap-4">
            <CommonFields
              form={form}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />

            {form.taskType === TaskType.DELIVERY && (
              <FormFields
                form={deliveryForm}
                handleInputChange={handleDeliveryInputChange}
              />
            )}

            {form.taskType === TaskType.PURCHASE && (
              <FormFields
                form={purchaseForm}
                handleInputChange={handlePurchaseInputChange}
              />
            )}
          </Flex>

          <Flex className="mt-10 flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button
                type="button"
                className="px-4 py-2 rounded-md border-solid font-semibold border-[#888] cursor-pointer"
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                type="button"
                color="teal"
                className="px-4 py-2 rounded-md cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white"
                onClick={onCreateTask}
                disabled={createButtonDisabled}
              >
                <CheckIcon height="18px" width="18px" className="mr-1" />
                Create
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
