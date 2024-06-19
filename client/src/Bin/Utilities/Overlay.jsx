import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import utility from "../../StyleSheets/Utility/Consts.scss";

export default function Overlay({
  sx = {},
  open,
  handleClose,
  handleOpen,
  children,
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="utilRoundedBorder" sx={{ ...sx }}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
