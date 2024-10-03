import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';
import '../styles/components/Modal.css';
import { RowData } from '../types/RowData';

type EditModalComponentProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (updatedUser: RowData) => void;
    userToEdit: RowData | null; // El usuario que se va a editar
};

const EditModalComponent = ({ isOpen, onClose, onSubmit, userToEdit }: EditModalComponentProps) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        sexo: 'Varon',
        fecha_nacimiento: '',
        edad: '',
        estado: 'Activo',
    });

    // Cargar los datos del usuario al abrir el modal
    useEffect(() => {
        if (userToEdit) {
            setFormData({
                nombre: userToEdit.nombre,
                apellidos: userToEdit.apellidos,
                sexo: userToEdit.sexo,
                fecha_nacimiento: userToEdit.fecha_nacimiento,
                edad: userToEdit.edad,
                estado: userToEdit.estado,
            });
        }
    }, [userToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userToEdit) {
            const updatedUser: RowData = {
                ...userToEdit,
                nombre: formData.nombre,
                apellidos: formData.apellidos,
                sexo: formData.sexo,
                fecha_nacimiento: formData.fecha_nacimiento,
                edad: formData.edad,
                estado: formData.estado,
                accion: 'Anular | Editar'
            };
            onSubmit(updatedUser); // Enviar el usuario actualizado a App.tsx
            onClose();
        }
    };

    return (
        <Popup open={isOpen} onClose={onClose} modal>
            <div className="modal-content new-modal">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2 className="modal-title">Editar usuario</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="modal-input"
                    />
                    <input
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                        className="modal-input"
                    />
                    <select
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                        required
                        className="modal-input"
                    >
                        <option value="Varon">Varón</option>
                        <option value="Mujer">Mujer</option>
                    </select>
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                        required
                        className="modal-input"
                    />
                    <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        required
                        className="modal-input"
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                    <button type="submit" className="modal-submit-button">Guardar cambios</button>
                </form>
            </div>
        </Popup>
    );
};

export default EditModalComponent;
