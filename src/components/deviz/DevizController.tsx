import React, { useEffect, useContext, useState } from "react";
import DevizBasic from "./DevizBasic";
import DevizeContext, { Deviz } from "../../store/DevizeStore";
import Spinner from "../layout/Spinner";
import DevizTemporaryStateContext, {
  IDevizTemporaryState,
} from "../../store/DevizStore";

export interface SingleDeviz {
  data: Deviz | null;
  loading: boolean;
  stopAct: IDevizTemporaryState;
}

function DevizController({ match, history }: any) {
  const { devizeState }: any = useContext(DevizeContext);
  const { devizTemporaryState }: any = useContext(DevizTemporaryStateContext);
  const [deviz, setDeviz] = useState<SingleDeviz>({
    data: null,
    loading: true,
    stopAct: devizTemporaryState,
  });

  function changeHistory(path: string) {
    if (path === "devize") history.push(`/${path}`);
    else if (path === "tehnicsts")
      history.push(`/${path}/${deviz.data!.idDeviz}`);
    else if (path === "produs") history.push(`/${path}/${deviz.data!.idDeviz}`);
    else history.push(`/${path}/${deviz.data!.idActivitateInceputa}`);
  }

  useEffect(() => {
    if (devizeState.loadedDevize === true) {
      const _deviz = devizeState.devize.find(
        (deviz: Deviz) => deviz.idDeviz === Number(match.params.id_deviz)
      );
      if (_deviz === undefined) history.push("/devize");
      else setDeviz({ ...deviz, loading: false, data: _deviz });
    } else history.push("/devize");
  }, []);

  if (deviz.loading === true || deviz.data === null) return <Spinner />;
  else
    return (
      <>
        <DevizBasic
          changeHistory={changeHistory}
          deviz={deviz}
          setDeviz={setDeviz}
        />
      </>
    );
}

export default DevizController;
