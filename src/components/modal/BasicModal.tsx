import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  styled
} from '@mui/material';
import React from 'react';

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  outline: 'none',
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
}));

const ModalHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  paddingBottom: '10px',
  borderBottom: '1px solid #eee',
});

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: theme.palette.grey[500],
}));

const ModalFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
  gap: '10px',
});

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  cancelText?: string;
  maxWidth?: number | string;
  fullWidth?: boolean;
}

const BasicModal: React.FC<BasicModalProps> = ({
  open,
  onClose,
  title,
  children,
  confirmText = '확인',
  onConfirm,
  cancelText = '취소',
  maxWidth = 400,
  fullWidth = false,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <ModalBox sx={{ width: fullWidth ? '90%' : maxWidth }}>
        <ModalHeader>
          <Typography id='modal-title' variant='h6' component='h2'>
            {title}
          </Typography>
          <CloseButton aria-label='close' onClick={onClose}>
            x
          </CloseButton>
        </ModalHeader>

        <Box id='modal-description' sx={{ mt: 2, mb: 4 }}>
          {children}
        </Box>

        <ModalFooter>
          <Button variant='outlined' onClick={onClose}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button variant='contained' onClick={handleConfirm}>
              {confirmText}
            </Button>
          )}
        </ModalFooter>
      </ModalBox>
    </Modal>
  );
};

export default BasicModal;