import { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { targetApi } from '@/api/targetApi';
import { useTarget } from '@/hooks/useTarget';
import { TargetHeader } from '@/components/Target/Header/TargetHeader';
import { PinnedTargets } from '@/components/Target/PinnedTargets';
import { TargetProgress } from '@/components/Target/TargetProgress';
import { TargetTimeline } from '@/components/Target/TargetTimeline';
import AddEditTarget from './AddEditTarget';
import { canPinMore } from '@/utils/Target/targetHelpers';

export default function TargetPage() {
  const {
    targets,
    baseFiltered,
    timelineTargets,
    selectedRange,
    setSelectedRange,
    setSelectedDay,
    refetch,
  } = useTarget();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [modalData, setModalData] = useState<any>(null);

  const openAddModal = () => {
    setModalType('add');
    setModalData(null);
    setIsModalOpen(true);
  };
  const openEditModal = (target: any) => {
    setModalType('edit');
    setModalData(target);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (payload: any) => {
    try {
      if (modalType === 'edit') {
        await targetApi.update(modalData._id || modalData.id, payload);
        toast.success('Target updated');
      } else {
        await targetApi.create(payload);
        toast.success('Target created');
      }
      refetch();
      closeModal();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Failed to save target');
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
      await targetApi.delete(id);
      toast.success('Deleted');
      refetch();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const updateIsPinned = async (id: string, isPinned: boolean) => {
    if (isPinned && !canPinMore(targets)) {
      toast.error('You can only pin up to 3 targets');
      return;
    }
    try {
      await targetApi.updatePinned(id, isPinned);
      toast.success(isPinned ? 'Pinned' : 'Un-pinned');
      refetch();
    } catch {
      toast.error('Failed to update pin');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-12 gap-4 p-4 md:p-0">
      <TargetHeader onAdd={openAddModal} />

      <PinnedTargets
        targets={targets}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onPinToggle={updateIsPinned}
      />

      <TargetProgress
        targets={baseFiltered}
        range={selectedRange}
        onRangeChange={setSelectedRange}
      />

      <TargetTimeline
        targets={timelineTargets}
        onDaySelect={setSelectedDay}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onPinToggle={updateIsPinned}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="w-full sm:w-[90%] md:w-[50%] max-h-[75%] bg-white rounded-md overflow-auto mx-4 sm:mx-6 md:mx-auto mt-24"
        overlayClassName="fixed inset-0 flex justify-center items-start bg-black/40 z-50"
      >
        <AddEditTarget
          initialData={modalData}
          onClose={closeModal}
          onSubmit={handleSubmit}
          type={modalType}
        />
      </Modal>
    </div>
  );
}