import axios from 'axios';

const NET = {
    APP_URL: location.origin + '/api',
    APP_URL_RAW: location.origin,
    CSRF_TOCKEN: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

export default NET;