import { Fragment } from "react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Catalix from "public/images/catalix.svg";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <Fragment>
          <div className="flex items-center gap-2">
            <Catalix className="size-6" />
            <span>Catalix UI</span>
          </div>
        </Fragment>
      ),
    },
  };
}
