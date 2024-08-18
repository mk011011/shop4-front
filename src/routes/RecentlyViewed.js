import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listGoods } from '../services/GoodsService';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addItem } from './../store/cartSlice';
import './../App.css';
import { deleteRecentlyViewedGoods } from '../store/recentlyViewedSlice';

const RecentlyViewed = () => {
  const state = useSelector((state) => state);
  const [shoes, setShoes] = useState([]);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  
  useEffect(() => {
    getAllGoods();
  }, []);
  
  function getAllGoods() {
    listGoods()
      .then((response) => {
        setShoes(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch goods:', error);
      });
  }

  const handleOrderClick = (item) => {
    dispatch(addItem(item)); 
    alert('상품이 장바구니에 추가되었습니다!')
  }

  const handleDeleteClick = (index) => {
    dispatch(deleteRecentlyViewedGoods(index));
  }
  
  return (
    
    <div>
      <br />
      <h2 style={{ textAlign: 'center' }}>최근 본 상품</h2>
      <br />
      {state.recentlyViewed.length === 0 ? (
        <p style={{ textAlign: 'center' }}>최근 본 상품이 없습니다.</p>
      ) : (
        <Table bordered hover>

          <tbody>
            {Array.from(new Set(state.recentlyViewed)).map((viewedItem,index) => {
              const shoe = shoes[viewedItem - 1];
              if (!shoe) return null;
              
              return (
                <tr key={shoe.id}>
                  <td>
                    <img 
                      src={shoe.url} 
                      alt={shoe.name} 
                      className="product-image" 
                      onClick={()=>navigate(`/detail/${shoe.id}`)}
                      style={{ cursor: 'pointer' }}
                    />
                  </td>
                  <td>
                    <div className='product-title'>{shoe.name}</div>
                    <div className='product-content'>{shoe.description}</div>
                    <div className='product-price'>{shoe.price}원</div>
                    <div className='product-count'>{shoe.stock}개</div>
                    <div className='product-buttons'>
                      <Button 
                        variant="primary" 
                        className="me-2"
                        onClick={() => {handleOrderClick(shoe)}}
                      >
                        장바구니담기
                      </Button>
                      <Button 
                        variant="success"
                        className="me-2"
                        onClick={() => {/* Handle order action */}}
                      >
                        주문하기
                      </Button>    
                      <Button 
                        variant="danger" 
                        onClick={() => {handleDeleteClick(index)}}
                      >
                        삭제
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RecentlyViewed;
