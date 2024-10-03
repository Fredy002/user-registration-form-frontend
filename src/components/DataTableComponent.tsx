import DataTable from 'react-data-table-component';
import { RowData } from '../types/RowData';

type DataTableComponentProps = {
    records: RowData[];
    loading: boolean;
    onExport: () => void;
    onDelete: (id: number) => void;
    onEdit: (user: RowData) => void;
};

const columns = (onEdit: (user: RowData) => void, onDelete: (id: number) => void) => [
    { name: 'Nombre', selector: (row: RowData) => row.nombre, sortable: true, minWidth: '150px' },
    { name: 'Apellidos', selector: (row: RowData) => row.apellidos, sortable: true, minWidth: '200px' },
    { name: 'Sexo', selector: (row: RowData) => row.sexo, sortable: true, minWidth: '100px' },
    { name: 'Fecha de Nacimiento', selector: (row: RowData) => row.fecha_nacimiento, sortable: true, minWidth: '200px' },
    { name: 'Edad', selector: (row: RowData) => row.edad, sortable: true, minWidth: '100px' },
    { name: 'Estado', selector: (row: RowData) => row.estado, sortable: true, minWidth: '150px' },
    {
        name: 'Acción',
        cell: (row: RowData) => (
            <div>
                <button className="edit-button" onClick={() => onEdit(row)}>Editar</button>
                <button
                    className="delete-button"
                    onClick={() => {
                        if (row.id !== undefined) {
                            onDelete(row.id);
                        } else {
                            console.error('ID no definido');
                        }
                    }}
                >
                    Eliminar
                </button>
            </div>
        ),
        minWidth: '150px'
    }
];


const DataTableComponent = ({ records, loading, onExport, onDelete, onEdit }: DataTableComponentProps) => {

    // Crear una función que valide el ID antes de llamarlo
    const handleDelete = (id?: number) => {
        if (id !== undefined) {
            onDelete(id);
        } else {
            console.error('ID no definido');
        }
    };

    return (
        <div className="table-container">
            <div className="export-container">
                <button className="export-button" onClick={onExport}>Exportar</button>
            </div>
            <DataTable
                className="custom-table"
                columns={columns(
                    onEdit,
                    handleDelete
                )}
                data={records}
                pagination
                progressPending={loading}
                paginationPerPage={5}
                fixedHeader
            />
        </div>
    );
};

export default DataTableComponent;
