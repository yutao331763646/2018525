import Vue from 'vue'
import Router from 'vue-router'
import Proposal from '@/components/proposal/Proposal'
import SchemeType from '@/components/schemetype/SchemeType'
import ChoosePharmavy from '@/components/publiccomponents/ChoosePharmavy'
import SelectUsers from  '@/components/selectusers/SelectUsers'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'SchemeType',
            component: SchemeType
        },
        {
            path: '/schemetype',
            name: 'SchemeType',
            component: SchemeType
        },
        {
            path: '/propsal',
            name: 'Proposal',
            component: Proposal
        }
    ]
})




