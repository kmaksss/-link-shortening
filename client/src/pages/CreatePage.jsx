import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
  const history = useNavigate();
  const auth = useContext(AuthContext)
  const [ link, setLink ] = useState('');
  const { request } = useHttp();

  useEffect(() => {
    window.M.updateTextFields();
  }, [])

  const pressHandler = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        });
        console.log(data);
        history(`/detail/${data.link._id}`)
      } catch(e) {}
    }
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '3rem' }}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Вставьте ссылку</label>
        </div>
      </div>
    </div>
  )
}