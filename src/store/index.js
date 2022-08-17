import { configureStore } from '@reduxjs/toolkit';
import role from './slices/role.slice';
import roles from './slices/roles.slice';
import campaigns from './slices/campaigns.slice';
import sections from './slices/sections.slice';
import advisers from './slices/advisers.slice';
import products from './slices/products.slice';
import solds from './slices/solds.slice';
import goals from './slices/goals.slice';
import investments from './slices/investments.slice';
import ugiVisible from './slices/ugiVisible.slice';
import sectionSelect from './slices/sectionSelect.slice';
import date from './slices/date.slice';
import loged from './slices/loged.slice';
import location from './slices/location.slice';
import successOrError from './slices/successOrError.slice';
import documents from './slices/documents.slice';
import sharedDocuments from './slices/sharedDocuments.slice';
import pagination from './slices/pagination.slice';
import isLoadding from './slices/isLoadding.slice';

export default configureStore({
  reducer: {
    role,
    roles,
    campaigns,
    sections,
    advisers,
    products,
    solds,
    goals,
    investments,
    ugiVisible,
    sectionSelect,
    date,
    loged,
    location,
    successOrError,
    documents,
    sharedDocuments,
    pagination,
    isLoadding,
	}
});