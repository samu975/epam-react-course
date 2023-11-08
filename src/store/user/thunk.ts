import { Dispatch } from 'redux';
import { getOwnInfo } from '../../services';

export const getOwnInfoThunk = (token: string) => {
	return async (dispatch: Dispatch) => {
		const ownInfo = await getOwnInfo(token);
		dispatch({ type: 'GET_OWN_INFO', payload: ownInfo });
	};
};
