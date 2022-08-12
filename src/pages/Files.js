import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavLeft from '../components/nav-left/NavLeft';
import NavTop from '../components/nav-top/NavTop';
import Reloj from '../components/reloj/Reloj';
import Upload from '../components/files/upload/Upload';
import Download from '../components/files/download/Download';
import Shared from '../components/files/shared/Shared';
import { getDocuments } from '../store/slices/documents.slice';
import { getSharedDocuments } from '../store/slices/sharedDocuments.slice';

const Files = () => {
    
    const role = useSelector(state=>state.role);
    const [files,setFiles] = useState(true);
    const [shared,setShared] = useState(false);
    const [upload,setUpload] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getDocuments(0,10));
      dispatch(getSharedDocuments());
    },[dispatch]);

    return (
      <div className='page-container'>
        <NavTop />
        <div className='body-pages-container'>
          {
            role !== 'viewer' ?
            <NavLeft />
            :
            <></>
          }
          <div className='files'>
              <div className='files-container'>
                  <Reloj />
                  <div className='sections-files'>
                    <div className='form-control'>
                      <div>
                        <div className='row'>
                          <div className='col-4'>
                            <p className='strong section' onClick={()=>{
                              setFiles(true);
                              setShared(false);
                              setUpload(false);
                            }} style={ files ? {color: '#0d6efd'} : {} }>Archivos</p>
                          </div>
                          <div className='col-4'>
                            <p className='strong section' onClick={()=>{
                              setFiles(false);
                              setShared(true);
                              setUpload(false);
                            }} style={ shared ? {color: '#0d6efd'} : {} }>Archivos Compartidos</p>
                          </div>
                          <div className='col-4'>
                            <p className='strong section' onClick={()=>{
                              setFiles(false);
                              setShared(false);
                              setUpload(true);
                            }} style={ upload ? {color: '#0d6efd'} : {} }>Subir un Archivo</p>
                          </div>
                        </div>
                      </div>
                      {
                        files ?
                          <Download />
                        :
                          <></>
                      }
                      {
                        shared ?
                          <Shared />
                        :
                          <></>
                      }
                      {
                        upload ?
                          <Upload />
                        :
                          <></>
                      }
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
};

export default Files;