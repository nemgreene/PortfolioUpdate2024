import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import utility from "../../StyleSheets/Utility/Consts.scss";
const { bgMain } = utility;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: bgMain,
  boxShadow: 24,
};

export default function Overlay({ open, handleClose, handleOpen, children }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="utilRoundedBorder" sx={style}>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
