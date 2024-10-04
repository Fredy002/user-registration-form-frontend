import { useState, useEffect, ChangeEvent } from 'react';
import DataTableComponent from './components/DataTableComponent';
import SearchBarComponent from './components/SearchBarComponent';
import ModalComponent from './components/ModalComponent';
import EditModalComponent from './components/EditModalComponent'; // Importar el componente de edición
import './styles/App.css';
import { RowData } from './types/RowData';
import api from './services/api';
import { downloadCSV } from './components/ExportCSV';

export default function App() {
  const [records, setRecords] = useState<RowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // Estado para el modal de edición
  const [userToEdit, setUserToEdit] = useState<RowData | null>(null); // Estado para el usuario a editar

  // Función para calcular la edad basada en la fecha de nacimiento
  const calculateAge = (birthdate: string): string => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date(); // Obtener la fecha actual
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const dayDifference = currentDate.getDate() - birthDate.getDate();

    // Ajustar la edad si el mes y el día de la fecha actual son menores que la fecha de nacimiento
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age.toString(); // Convertir la edad a string para mostrarla correctamente
  };

  // Obtener los usuarios desde la API y calcular la edad
  const getUsers = async () => {
    try {
      const response = await api.get('/user');
      const usersWithAge = response.data.user.map((user: RowData) => ({
        ...user,
        edad: calculateAge(user.fecha_nacimiento), // Calcular la edad para cada usuario
      }));
      setRecords(usersWithAge); // Actualizar el estado con los usuarios y su edad
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      getUsers(); // Recargar los usuarios completos si se limpia el campo de búsqueda
    } else {
      const filteredRecords = records.filter(record =>
        record.nombre.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setRecords(filteredRecords);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  // Función para abrir el modal de edición con el usuario seleccionado
  const handleEdit = (user: RowData) => {
    setUserToEdit(user); // Establecer el usuario a editar
    setEditModalOpen(true); // Abrir el modal de edición
  };


  // Función para agregar un nuevo usuario a la tabla
  const addNewUser = async (newUser: RowData) => {
    try {
      newUser.edad = calculateAge(newUser.fecha_nacimiento); // Calcular la edad antes de enviar el usuario
      const response = await api.post('/user', newUser);
      setRecords([...records, response.data.user]);
      closeModal(); // Cerrar el modal después de agregar
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (id: number) => {
    try {
      await api.delete(`/user/${id}`);
      setRecords(records.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  // Función para actualizar un usuario
  const updateUser = async (id: number, updatedUser: RowData) => {
    try {
      updatedUser.edad = calculateAge(updatedUser.fecha_nacimiento); // Calcular la edad antes de actualizar
      const response = await api.put(`/user/${id}`, updatedUser);
      setRecords(records.map(user => (user.id === id ? response.data.user : user)));
      closeEditModal(); // Cerrar el modal de edición después de actualizar
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  const handleExport = () => {
    downloadCSV(records);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Formulario de Registro</h1>
      <div className="actions-container">
        <SearchBarComponent onSearch={handleSearch} />
        <button className="new-user-button" onClick={toggleModal}>Añadir usuario</button>
      </div>
      <DataTableComponent
        records={records}
        loading={loading}
        onExport={handleExport}
        onDelete={deleteUser}
        onEdit={handleEdit} // Pasar la función de edición a DataTableComponent
      />
      <ModalComponent
        isOpen={modalOpen}
        onClose={closeModal} // Utilizar la función específica para cerrar el modal
        onSubmit={addNewUser}
      />
      <EditModalComponent
        isOpen={editModalOpen}
        onClose={closeEditModal} // Utilizar la función específica para cerrar el modal de edición
        onSubmit={(updatedUser) => updateUser(updatedUser.id!, updatedUser)}
        userToEdit={userToEdit}
      />
    </div>
  );
}
