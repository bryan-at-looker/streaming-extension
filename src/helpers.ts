import { LookerSDK, IQueryTask } from "@looker/sdk"

export async function newQueryTaskPoller(sdk: LookerSDK, query_id: number, format: string, results_function: any) {
  const eqt = await sdk.ok(sdk.create_query_task({
    body: { 
      query_id: query_id,
      result_format: format,
    },
    generate_drill_links: true
  }))
  while (true) {
    const poll: IQueryTask = await sdk.ok(sdk.query_task(eqt.id!))
    if (poll) {
      if (poll.status === 'failure' || poll.status == 'error') {
        return
      }
      if (poll.status === 'complete') {
        const results = await sdk.ok(sdk.query_task_results(eqt.id!))
        if (results) {
          results_function(results)
        }
        break
      }
    }
    await sleep(2000)
  }
}

async function sleep (ms: number) {
  return new Promise(resolve  =>{
    setTimeout(resolve, ms)
  })
}