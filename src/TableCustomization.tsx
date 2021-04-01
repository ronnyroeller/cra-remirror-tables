import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TableComponents } from '@remirror/extension-react-tables';
import {
	TableCellMenuButtonProps,
	TableCellMenuPopupProps,
} from '@remirror/extension-react-tables/dist/declarations/src/components/table-cell-menu';
import { useCommands } from '@remirror/react-core';

const useStyles = makeStyles(theme => ({
	popup: {
		...theme.typography.body2,
		position: 'absolute',
		backgroundColor: 'white',
		width: 320,
		boxShadow: theme.shadows[8],
		borderRadius: theme.shape.borderRadius,
	},
}));

const ButtonComponent: React.FC<TableCellMenuButtonProps> = ({
	setPopupOpen,
}) => {
	return (
		<IconButton size="small" onClick={() => setPopupOpen(true)}>
			<ExpandMoreIcon />
		</IconButton>
	);
};

const PopupComponent: React.FC<TableCellMenuPopupProps> = ({
	setPopupOpen,
}) => {
	const commands = useCommands();
	const classes = useStyles();

	// close the popup after clicking
	const handleClick = (command: () => void) => {
		return () => {
			command();
			setPopupOpen(false);
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
		<List className={classes.popup}>
			<ListItem button onClick={setTableCellBackground('red')}>
				<ListItemText>Highlight</ListItemText>
			</ListItem>
			<ListItem button onClick={setTableCellBackground(null)}>
				<ListItemText>Remove cell color</ListItemText>
			</ListItem>

			<ListItem button onClick={handleClick(commands.addTableRowBefore)}>
				<ListItemText>Insert row above</ListItemText>
			</ListItem>
			<ListItem button onClick={handleClick(commands.addTableRowAfter)}>
				<ListItemText>Insert row below</ListItemText>
			</ListItem>
			<ListItem button onClick={handleClick(commands.addTableColumnBefore)}>
				<ListItemText>Insert column before</ListItemText>
			</ListItem>
			<ListItem button onClick={handleClick(commands.addTableColumnAfter)}>
				<ListItemText>Insert column after</ListItemText>
			</ListItem>

			<ListItem button onClick={handleClick(commands.deleteTableColumn)}>
				<ListItemText>Remove column</ListItemText>
			</ListItem>
			<ListItem button onClick={handleClick(commands.deleteTableRow)}>
				<ListItemText>Remove row</ListItemText>
			</ListItem>
			<ListItem button onClick={handleClick(commands.deleteTable)}>
				<ListItemText>Remove table</ListItemText>
			</ListItem>
		</List>
	);
};

export function TableCustomization() {
	return (
		<TableComponents
			tableCellMenuProps={{
				ButtonComponent,
				PopupComponent,
			}}
		/>
	);
}
