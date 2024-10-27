import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      'authToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'
    );
    res.status(200).json({
      success: true,
      message: '로그아웃 성공',
    });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({
      success: false,
      message: '허용되지 않은 메서드입니다.',
    });
  }
}
