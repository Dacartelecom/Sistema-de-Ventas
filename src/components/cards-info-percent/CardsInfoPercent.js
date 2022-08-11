import React from 'react';
import CirclePercent from './circle-percent/CirclePercent';
import Investments from './investments/Investments';
import { useSelector } from 'react-redux';

const CardsInfoPercent = () => {

  let total = 0;
  let meta = 0;
  let ugi = 0;
  let percent = 0;

  const role = useSelector(state=>state.role);
  const products = useSelector(state=>state.products);
  const solds = useSelector(state=>state.solds);
  const goals = useSelector(state=>state.goals);
  const ugiVisible = useSelector(state=>state.ugiVisible);

  if (solds.length) {
    solds.map(sold=>{
      const product = sold.product.name.split(' ');
      ugi += sold.sold*parseInt(product[0]);
      return total += sold.sold;
    }); 
  };

  if (goals.length) {
    goals.map(goal=>{
      meta += goal.goal
      return percent = ((total/meta)*100).toFixed(2);
    });
  };

    return (
          <div className='cards-info percent-container'>
            <div className='percent-general'>
              <div>
                <CirclePercent radio={108} color={"#f49d1c"} percent={ percent } size={3.5}/>
              </div>
              <div className='info-text-general'>
                <p>total: { total }</p>
                <p>meta: { goals.length ? meta : 0 }</p>
                { ugiVisible ? <p>ugi: { ugi }</p> : <></> }
              </div>
            </div>
            <div className='percent-products'>
              { products?.map(product=>(
                <div key={ product?.id }>
                  <CirclePercent radio={65} product={product} goal={meta}/>
                  <p>{ product?.name }</p>
                </div>
              )) }
            </div>
            <div className='investment'>
              {
                role !== 'asesor' ?
                  <Investments />
                :
                  <></>
              }
            </div>
          </div>
    );
};

export default CardsInfoPercent;