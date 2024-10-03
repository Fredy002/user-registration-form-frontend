import Popup from 'reactjs-popup';
import { useState } from 'react';
import '../styles/components/Modal.css';
import { RowData } from '../types/RowData';

type ModalComponentProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (newUser: RowData) => void;
};

const ModalComponent = ({ isOpen, onClose, onSubmit }: ModalComponentProps) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        sexo: 'Varon',
        fecha_nacimiento: '',
        edad: '',
        estado: 'Activo',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Convertir el formulario a un objeto RowData para la tabla
        const newUser: RowData = {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            sexo: formData.sexo,
            fecha_nacimiento: formData.fecha_nacimiento,
            edad: formData.edad,
            estado: formData.estado,
            accion: 'Anular | Editar'
        };

        onSubmit(newUser);
        onClose();
    };

    return (
        <Popup open={isOpen} onClose={onClose} modal>
            <div className="modal-content new-modal">
                <button className="close-button" onClick={onClose}>✖</button>
                <h2 className="modal-title">Añadir usuario</h2>
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
                        name="apellidos"
                        placeholder="Apellidos"
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
                    <button type="submit" className="modal-submit-button">Añadir</button>
                </form>
            </div>
        </Popup>
    );
};

export default ModalComponent;
