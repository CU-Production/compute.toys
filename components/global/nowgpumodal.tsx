import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAtomValue } from 'jotai';
import { wgpuAvailabilityAtom } from 'lib/atoms/atoms';
import { Fragment, useEffect, useState } from 'react';
import { theme } from 'theme/theme';
import Logo from './logo';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export default function NoWgpuModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const wgpuAvailability = useAtomValue(wgpuAvailabilityAtom);

    useEffect(() => {
        if (wgpuAvailability === 'unavailable') {
            handleOpen();
        }
    }, [wgpuAvailability]);

    return (
        <Fragment>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Stack color={theme.palette.primary.contrastText} spacing={2}>
                        <Typography>WebGPU support was not detected in your browser.</Typography>
                        <Typography>
                            For information on how to set up your browser to run WebGPU code,
                        </Typography>
                        <Typography>
                            please see the instructions linked on the <Logo /> homepage.
                        </Typography>
                    </Stack>
                </Box>
            </Modal>
        </Fragment>
    );
}
