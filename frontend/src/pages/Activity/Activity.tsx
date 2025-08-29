import { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { activityApi } from '@/api/activityApi';
import { useActivity } from '@/hooks/useActivity';
import { ActivityHeader } from '@/components/Activity/Header/ActivityHeader';
import { ActivityTimeline } from '@/components/Activity/ActivityTimeline';
import { ActivityStats } from '@/components/Activity/ActivityStats';
import AddEditActivity from './AddEditActivity';

export default function ActivityPage() {
  const {
    baseFiltered,
    timelineActivities,
    selectedRange,
    setSelectedRange,
    setSelectedDay,
    refetch,
  } = useActivity();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [modalData, setModalData] = useState<any>(null);

  const openAddModal = () => {
    setModalType('add');
    setModalData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (activity: any) => {
    setModalType('edit');
    setModalData(activity);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (payload: any) => {
    try {
      if (modalType === 'edit') {
        await activityApi.update(modalData._id || modalData.id, payload);
        toast.success('Activity updated');
      } else {
        await activityApi.create(payload);
        toast.success('Activity created');
      }
      refetch();
      closeModal();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to save activity');
    }
  };

  const handleDelete = async (id: string) => {
    const res = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });
    if (!res.isConfirmed) return;
    try {
      await activityApi.delete(id);
      toast.success('Deleted');
      refetch();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-12 gap-4 p-4 md:p-0">
      <ActivityHeader onAdd={openAddModal} />

      <ActivityTimeline
        activities={timelineActivities}
        onDaySelect={setSelectedDay}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <ActivityStats activities={baseFiltered} range={selectedRange} onRangeChange={setSelectedRange} />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="w-full sm:w-[90%] md:w-[50%] max-h-[75%] bg-white rounded-md overflow-auto mx-4 sm:mx-6 md:mx-auto mt-24"
        overlayClassName="fixed inset-0 flex justify-center gap-10 items-start bg-black/40 z-50"
      >
        <AddEditActivity
          initialData={modalData}
          onClose={closeModal}
          onSubmit={handleSubmit}
          type={modalType}
        />
      </Modal>
    </div>
  );
}