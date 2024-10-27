import type { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from 'shared/api/users/types';
import userData from 'shared/data/user_list.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userEmail } = req.body;

    const user = userData.find((user) => user.userEmail === userEmail);

    if (user) {
      const token = 'login-token';
      res.setHeader(
        'Set-Cookie',
        `authToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
      );
      res.status(200).json({
        data: {
          ...user,
          userRole: user.userRole as IUser['userRole'],
        },
      });
    } else {
      res.status(401).json({ success: false });
    }
  }
}
