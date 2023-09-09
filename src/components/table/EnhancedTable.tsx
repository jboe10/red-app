import * as React from 'react';
import TableSearch from './TableSearch';
import DropDown from '../DropDown';
import CreateOrderModal from '../CreateOrderModal';
import EditOrderModal from '../EditOrderModal';
import {
	DataGrid,
	GridColDef,
	GridActionsCellItem,
	GridRowParams,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

import { Box, Button } from '@mui/material';
import { getMany } from '../../api/OrderApi';
import { deleteOne } from '../../api/OrderApi';

export default function EnhancedTable() {
	const [currentRowData, setCurrentRowData] = React.useState();
	const [openEditModal, setOpenEditModal] = React.useState(false);
	const [orderFilter, setOrderFilter] = React.useState(-1);
	const [rows, setRows] = React.useState([]);
	const [search, setSearch] = React.useState('');

	React.useEffect(() => {
		const makeBaseApiCall = async () => {
			const data = await getMany();
			setRows(data);
		};
		makeBaseApiCall();
	}, []);

	const handleSearchButtonClick = async () => {
		const data = await getMany(orderFilter, search);
		setRows(data);
	};

	const handleEdit = (params: GridRowParams) => {
		setOpenEditModal(true);
		setCurrentRowData(params.row);
	};
	const handleDelete = async (params: GridRowParams) => {
		await deleteOne(params.row.id);
	};

	const columns: GridColDef[] = [
		{
			field: 'actions',
			type: 'actions',
			getActions: (params: GridRowParams) => [
				<GridActionsCellItem
					icon={<DeleteIcon />}
					onClick={() => handleDelete(params)}
					label="Delete"
				/>,
				<GridActionsCellItem
					icon={<EditIcon />}
					onClick={() => handleEdit(params)}
					label="Edit"
				/>,
			],
		},
		{ field: 'id', headerName: 'ID', width: 300 },
		{ field: 'customerName', headerName: 'Customer Name', width: 200 },
		{ field: 'type', headerName: 'Order type', width: 130 },
		{
			field: 'createdByUsername',
			headerName: 'Created By Username',
			width: 200,
		},
		{
			field: 'createdDate',
			headerName: 'Date',
			description: 'This column has a value getter and is not sortable.',
			sortable: true,
			width: 240,
		},
	];

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Box
					sx={{
						padding: '10px',
						display: 'flex',
						alignItems: 'center',
						background: 'white',
						borderRadius: '5px 5px 0 0',
					}}
				>
					<DropDown
						hasAllOption={true}
						value={orderFilter}
						setValue={setOrderFilter}
					/>
					<TableSearch setSearch={setSearch} />
					<Button
						variant="contained"
						sx={{ backgroundColor: '#DB3534' }}
						onClick={handleSearchButtonClick}
					>
						<SearchIcon></SearchIcon>
					</Button>
					<Box
						sx={{
							marginLeft: 'auto',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<CreateOrderModal />
					</Box>
				</Box>
				<DataGrid
					sx={{ background: 'white', borderRadius: '0 0 5px 5px' }}
					rows={rows}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
				/>
			</Box>
			<EditOrderModal
				open={openEditModal}
				setOpen={setOpenEditModal}
				rowData={currentRowData}
			/>
		</>
	);
}
