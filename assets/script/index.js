'use strict';

import * as Utils from './utils.js';
import {Subscriber} from './Subscriber.js';

const user = Utils.select('.user');
const text = Utils.select('textarea');
const image = Utils.select('.image');
const post = Utils.select('.post');

let posts = []

