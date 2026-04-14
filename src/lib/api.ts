const API_KEY = '329d7634-ec7a-4d0a-8dd3-c39a5818632d'
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/images/generations'

export interface GenerateImageParams {
  prompt: string
  model?: string
  size?: string
}

export interface GenerateImageResponse {
  data: Array<{
    url: string
  }>
  created: number
}

export async function generateImage(params: GenerateImageParams): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: params.model || 'doubao-seedream-5-0-260128',
      prompt: params.prompt,
      sequential_image_generation: 'disabled',
      response_format: 'url',
      size: params.size || '2K',
      stream: false,
      watermark: true
    })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: '请求失败' }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  const data: GenerateImageResponse = await response.json()
  
  if (!data.data || data.data.length === 0) {
    throw new Error('未返回图片数据')
  }

  return data.data[0].url
}
