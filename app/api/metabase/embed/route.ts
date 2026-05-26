import { SignJWT } from 'jose'

const METABASE_SITE_URL = process.env.METABASE_SITE_URL
const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY

function getSecretKey(): Uint8Array {
  if (!METABASE_SECRET_KEY) {
    throw new Error('METABASE_SECRET_KEY is not set')
  }
  return new TextEncoder().encode(METABASE_SECRET_KEY)
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const dashboard = searchParams.get('dashboard')
    const question = searchParams.get('question')

    if (!dashboard && !question) {
      return Response.json(
        { error: 'Provide ?dashboard=<id> or ?question=<id>' },
        { status: 400 },
      )
    }

    const resource: Record<string, number> = {}
    if (dashboard) resource.dashboard = Number(dashboard)
    if (question) resource.question = Number(question)

    const params: Record<string, string> = {}
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'dashboard' && key !== 'question') {
        params[key] = value
      }
    }

    const secret = getSecretKey()

    const payloadParams = Object.keys(params).length > 0 ? params : {}

    const token = await new SignJWT({
      resource,
      params: payloadParams,
      _embedding_params: payloadParams,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret)

    return Response.json({
      token,
      instanceUrl: METABASE_SITE_URL,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal error'
    return Response.json({ error: message }, { status: 500 })
  }
}
