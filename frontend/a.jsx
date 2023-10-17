import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Table, Button, Form } from 'react-bootstrap';
import './Category.css'
import { usersApi } from '../../../axiosApi/axiosInstance';
import { toast } from 'react-toastify';

const Category = () => {
  const [added, setAdded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [allCategories, setAllCategories] = useState([])
  const [editCategoryModalVisible, setEditCategoryModalVisible] = useState(false);
  const [editedCategory, setEditedCategory] = useState({ id: '', name: '' });


  const addCategory = async () => {

    try {

      let res = await usersApi.post('admin/adminCategory', { categoryName: newCategory })
      console.log(res)
      if (res.data.message) {
        toast.success("Successfully added")
      }
      setNewCategory('')
      setShowModal(false)
      setAdded(true)

    } catch (error) {

      return toast.error(error.response.data.message)


    }
  }


  // delete

  const deleteCategory = async (categoryId) => {

    try {
      const res = await usersApi.delete(`/admin/adminCategory/${categoryId}`)
      if (res.data.message) {
        toast.success('Category Successfully Deleted')
        setAdded(true)
      }

    } catch (error) {
      toast.error("Error Occured")
    }

  }

  // Edit category

  const openEditCategoryModal = (categoryId, categoryName) => {
    setEditedCategory({ id: categoryId, name: categoryName });
    setEditCategoryModalVisible(true);
  };

  const saveEditedCategory = async () => {
    try {
      console.log('Editing category:', editedCategory);
      const res = await usersApi.put(`/admin/adminCategory/${editedCategory.id}`, {
        categoryName: editedCategory.name,
      });
      console.log('Response from server:', res);
      if (res.data.message) {
        toast.success('Category Successfully Updated');
        setEditCategoryModalVisible(false);
        setAdded(true);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Error Occurred');
    }
  };
  

  // get method
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await usersApi.get('/admin/adminCategory')
      if (res.data) {
        console.log(res.data);
        setAllCategories(res.data)
        setAdded(false)
      }
    }
    fetchCategories()

  }, [added])

  return (
    <div>
      <h1 className='cat-heading p-3 text-white'>Categories</h1>
      <div className=' px-5'>
        <button className='categotyButton rounded-pill px-3' onClick={() => setShowModal(true)}>Add Category</button>
      </div>
      <div className='p-5'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allCategories.map((category, index) => (
              <tr key={index}>
                <td>{category.categoryName}</td>
                <td>
                  <button
                    className='editButton'
                    onClick={() => openEditCategoryModal(category._id, category.categoryName)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className='deleteButton' variant='danger' onClick={() => deleteCategory(category._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Modal for adding a new category */}
     

      {/* Modal for editing a category */}
      <Modal show={editCategoryModalVisible} onHide={() => setEditCategoryModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category name'
              value={editedCategory.name}
              onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setEditCategoryModalVisible(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={saveEditedCategory}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Category;