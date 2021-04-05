import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { TableComponents } from "@remirror/extension-react-tables";
import type { TableCellMenuComponentProps } from "@remirror/extension-react-tables";
import { useCommands } from "@remirror/react-core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  popup: {
    // ...theme.typography.body2,
    // position: 'absolute',
    // backgroundColor: 'white',
    width: 320,
    // boxShadow: theme.shadows[8],
    // borderRadius: theme.shape.borderRadius,
  },
}));

const ContextMenu: React.FC<TableCellMenuComponentProps> = ({
  popupOpen,
  setPopupOpen,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setPopupOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopupOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        size="small"
        onClick={handleClick}
      >
        <ExpandMoreIcon />
      </IconButton>
      <MenuPopup
        anchorEl={popupOpen ? anchorEl : null}
        handleClose={handleClose}
      />
    </div>
  );
};

const MenuPopup: React.FC<{
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}> = ({ anchorEl, handleClose }) => {
  const commands = useCommands();
  const classes = useStyles();

  // close the popup after clicking
  const handleClick = (command: () => void) => {
    return () => {
      command();
      handleClose();
    };
  };

  // Notice that we won't close the popup after changing the cell background
  // because we want users to quick try multiple colors.
  const setTableCellBackground = (color: string | null) => {
    return () => {
      commands.setTableCellBackground(color);
    };
  };

  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      classes={{ paper: classes.popup }}
      onClose={handleClose}
    >
      <MenuItem button onClick={setTableCellBackground("red")}>
        Highlight
      </MenuItem>
      <MenuItem button onClick={setTableCellBackground(null)}>
        Remove cell color
      </MenuItem>

      <MenuItem button onClick={handleClick(commands.addTableRowBefore)}>
        Insert row above
      </MenuItem>
      <MenuItem button onClick={handleClick(commands.addTableRowAfter)}>
        Insert row below
      </MenuItem>
      <MenuItem button onClick={handleClick(commands.addTableColumnBefore)}>
        Insert column before
      </MenuItem>
      <MenuItem button onClick={handleClick(commands.addTableColumnAfter)}>
        Insert column after
      </MenuItem>

      <MenuItem button onClick={handleClick(commands.deleteTableColumn)}>
        Remove column
      </MenuItem>
      <MenuItem button onClick={handleClick(commands.deleteTableRow)}>
        Remove row
      </MenuItem>
      <MenuItem button onClick={handleClick(commands.deleteTable)}>
        Remove table
      </MenuItem>
    </Menu>
  );
};

export function TableCustomization() {
  return (
    <TableComponents
      tableCellMenuProps={{
        Component: ContextMenu,
      }}
    />
  );
}
