import { Fragment } from "react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Foundry from "public/images/foundry.svg";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <Fragment>
          <div className="flex items-center gap-2">
            <Foundry className="size-6" />
            <span>Foundry UI</span>
          </div>
        </Fragment>
      ),
    },
  };
}
