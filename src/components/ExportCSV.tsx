import { RowData } from '../types/RowData';

// Convertir un array de objetos a formato CSV
export const convertArrayOfObjectsToCSV = (array: RowData[]): string | null => {
    if (array.length === 0) return null;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    let result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach(item => {
        let ctr = 0;
        keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;

            // @ts-expect-error - Aquí indicamos que esperamos un posible error si la propiedad no existe en el objeto
            result += item[key] ?? '';
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
};

// Función para descargar el CSV
export const downloadCSV = (array: RowData[]): void => {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = 'usuarios_registrados.csv';
    if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', filename);
    link.click();
};
