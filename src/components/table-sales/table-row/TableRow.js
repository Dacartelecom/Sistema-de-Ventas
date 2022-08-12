import axios from 'axios';
import React, { useEffect, useState } from 'react';
//import { useRef } from 'react';
import { useSelector } from 'react-redux';
import getConfig from '../../../utils/getConfig';
//import { io } from 'socket.io-client';

const TableRow = ({section,name='campañas',body=false}) => {

    const date = useSelector(state=>state.date);
    const [listSales,setListSales] = useState([]);

    // const socket = useRef();

    // useEffect(()=>{
    //     socket.current = io('ws:https://server-io-dacartelecom.herokuapp.com/');
    // },[]);

    let total = 0

    //hours
    const nineAM = new Date(`${date?.startDate} 04:00`).getTime();
    const tenAM = new Date(`${date?.startDate} 05:00`).getTime();
    const elevenAM = new Date(`${date?.startDate} 06:00`).getTime();
    const twelveAM = new Date(`${date?.startDate} 07:00`).getTime();
    const onePM = new Date(`${date?.startDate} 08:00`).getTime();
    const twoPM = new Date(`${date?.startDate} 09:00`).getTime();
    const trheePM = new Date(`${date?.startDate} 10:00`).getTime();
    const fourPM = new Date(`${date?.startDate} 11:00`).getTime();
    const fivePM = new Date(`${date?.startDate} 12:00`).getTime();
    const sixPM = new Date(`${date?.startDate} 13:00`).getTime();
    const sevenPM = new Date(`${date?.startDate} 14:00`).getTime();
    const eigthPM = new Date(`${date?.startDate} 15:00`).getTime();
    const ninePM = new Date(`${date?.startDate} 16:00`).getTime();
    const tenPM = new Date(`${date?.startDate} 17:00`).getTime();

    //solds
    let soldNineAM = 0;
    let soldTenAM = 0;
    let soldElevenAM = 0;
    let soldTwelveAM = 0;
    let sodlOnePM = 0;
    let soldTwoPM = 0;
    let soldTrhePM = 0;
    let soldFourPM = 0;
    let soldFivePM = 0;
    let soldSixPM = 0;
    let soldSevenPM = 0;
    let soldEigthPM = 0;
    let soldNinePM = 0;
    let soldTenPM = 0;

    useEffect(()=>{
        if (section) {
            const getSales = async ()=>{
                try {
                    const sales = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&sectionId=${section.id}`,getConfig());
                    setListSales(sales.data.sales);
                } catch (error) {
                    console.log(error.response.data);
                };
            };

            getSales();
        }
    },[section,date?.startDate]);

    // useEffect(()=>{

    //     socket.current.on('newSale', sect=>{
    //         if (section?.id === parseInt(sect)) {
    //             const getSales = async ()=>{
    //                 try {
    //                     const sales = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&sectionId=${section.id}`,getConfig());
    //                     setListSales(sales.data.sales);
    //                 } catch (error) {
    //                     console.log(error.response.data);
    //                 };
    //             };
    
    //             getSales();
    //         };
    //     });

    // },[date?.startDate,section?.id]);

    if (listSales.length) {
        listSales.map(sale=>{
            const date = new Date(sale.dayTime).getTime();

            if (date === nineAM) {
                soldNineAM += sale.sold;
            };
            if (date === tenAM) {
                soldTenAM += sale.sold;;
            };
            if (date === elevenAM) {
                soldElevenAM += sale.sold;
            };
            if (date === twelveAM) {
                soldTwelveAM += sale.sold;
            };
            if (date === onePM) {
                sodlOnePM += sale.sold;
            };
            if (date === twoPM) {
                soldTwoPM += sale.sold;
            };
            if (date === trheePM) {
                soldTrhePM += sale.sold;
            };
            if (date === fourPM) {
                soldFourPM += sale.sold;
            };
            if (date === fivePM) {
                soldFivePM += sale.sold;
            };
            if (date === sixPM) {
                soldSixPM += sale.sold;
            };
            if (date === sevenPM) {
                soldSevenPM += sale.sold;
            };
            if (date === eigthPM) {
                soldEigthPM += sale.sold;
            };
            if (date === ninePM) {
                soldNinePM += sale.sold;
            };
            if (date === tenPM) {
                soldTenPM += sale.sold;
            };

            return total += sale.sold;
        });
    };

    return (
        <div className='table-row'>
            <div>
                <p>{name}</p>
            </div>
            <div>
                <p>{ body ? total : 'total' }</p>
            </div>
            <div>
                <p>{ body ? soldNineAM : '09 am' }</p>
            </div>
            <div>
                <p>{ body ? soldTenAM : '10 am'}</p>
            </div>
            <div>
                <p>{ body ? soldElevenAM : '11 am' }</p>
            </div>
            <div>
                <p>{ body ? soldTwelveAM : '12 am' }</p>
            </div>
            <div>
                <p>{ body ? sodlOnePM : '01 pm' }</p>
            </div>
            <div>
                <p>{ body ? soldTwoPM : '02 pm' }</p>
            </div>
            <div>
                <p>{ body ? soldTrhePM : '03 pm' }</p>
            </div>
            <div>
                <p>{ body ? soldFourPM : '04 pm' }</p>
            </div>
            <div>
                <p>{ body ? soldFivePM : '05 pm' }</p>
            </div>
            <div>
                <p>{ body ? soldSixPM : '06 pm' }</p>
            </div>
            <div>
                <p>{ body ? soldSevenPM : '07 pm' }</p>
            </div>
            <div>
                <p>{ body ? soldEigthPM : '08 pm' }</p>
            </div>
            <div>
                <p>{ body ? soldNinePM : '09 pm' }</p>
            </div>
            <div>
                <p>{ body ? soldTenPM : '10 pm' }</p>
            </div>
        </div>
    );
};

export default TableRow;