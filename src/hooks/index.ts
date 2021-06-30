import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppDispatch } from '../state';
import { RootState } from '../state';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
