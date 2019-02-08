// *----------* Saga *----------*
import { put as dispatch, takeLatest} from 'redux-saga/effects';

// *----------* Axios *----------*
import axios from 'axios';

// *----------* Template Sagas *----------*

// Worker saga responsible for handling FETCH_TEMPLATES actions
function* fetchTemplates(action){
    try {

        // destructure payload
        const {type_Id} = action.payload;

        // Request templates from API by
        const { data : templatesResponseData } = yield axios.get(`/api/template/${type_Id}`);

        // Updat redux 
        yield dispatch({
            type: 'SET_TEMPLATES',
            payload: templatesResponseData
        })

    } catch (error) {
        console.log(`Error in fetchTemplates`);
    }
}

// Worker Saga responsible for handling FETCH_TEMPLATE_TYPES actions
function* fetchTemplateTypes (){
    try {

        // Request template types, destructure response, and alias it
        const { data : templatesResponseData } = yield axios.get('/api/template/types')

        // Update redux 
        yield dispatch({
            type: 'SET_TEMPLATE_TYPES',
            payload: templatesResponseData
        })

    } catch (error) {
        console.log(`Error in fetchTemplateTypes`);
    }
}

function* templateSaga (){
    yield takeLatest('FETCH_TEMPLATES', fetchTemplates);
    yield takeLatest('FETCH_TEMPLATE_TYPES', fetchTemplateTypes);
}

export default templateSaga;