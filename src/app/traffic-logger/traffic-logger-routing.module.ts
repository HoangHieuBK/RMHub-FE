import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    RMHubTrafficLoggerAlertRulesModule,
    RMHubTrafficLoggerDetailDeviceModule,
    RMHubTrafficLoggerListDeviceModule,
    RMHubTrafficLoggerReportsModule,
} from './screens';
import { CommonConstant } from '@shared/common/constant.common';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: CommonConstant.URL_TRAFFIC_LOGGER.list,
                loadChildren: () => RMHubTrafficLoggerListDeviceModule,
                data: { preload: true }
            },

            {
                path: CommonConstant.URL_TRAFFIC_LOGGER.detail + '/:id',
                loadChildren: () => RMHubTrafficLoggerDetailDeviceModule,
                data: { preload: true }
            },
            {
                path: CommonConstant.URL_TRAFFIC_LOGGER.alert,
                loadChildren: () => RMHubTrafficLoggerAlertRulesModule,
                data: { preload: true }
            },
            {
                path: CommonConstant.URL_TRAFFIC_LOGGER.report,
                loadChildren: () => RMHubTrafficLoggerReportsModule,
                data: { preload: true }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RMHubTrafficRoutingModule {}
