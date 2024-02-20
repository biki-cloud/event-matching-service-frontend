import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const EventRegister = () => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    name: '',
    info: '',
    state: 'draft', // 初期状態をdraftに設定
    eventer_id: '' // このIDはログインしているユーザーのIDに基づいて設定する必要がある
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventer_id = localStorage.getItem('eventer_id');
    try {
      eventData.eventer_id = eventer_id;
      console.log(eventData);
      const response = await fetch(`${API_BASE_URL}/event/register/${eventer_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error('Event registration failed');
      alert('イベント登録成功');
      navigate('/eventer/manage'); // イベント管理画面へ遷移
    } catch (error) {
      console.error(error);
      alert('イベント登録に失敗しました');
    }
  };

  return (
    <div>
      <h1>イベント登録</h1>
      <form onSubmit={handleSubmit}>
        <label>
          イベント名:
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          イベント情報:
          <input
            type="text"
            name="info"
            value={eventData.info}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          イベント状態:
          <select
            name="state"
            value={eventData.state}
            onChange={handleInputChange}
            required
          >
            <option value="draft">下書き</option>
            <option value="open">公開</option>
            <option value="close">終了</option>
          </select>
        </label>
        <button type="submit">イベント登録</button>
      </form>
    </div>
  );
};

export default EventRegister;
