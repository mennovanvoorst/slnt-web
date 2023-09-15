import user from "@models/user";
import { Providers } from "@interfaces/user";

export const handleAuthentication = async (
  req: any,
  profile: any,
  accessToken,
  refreshToken,
  expiresIn,
  provider: keyof Providers
): Promise<any> => {
  if (!req.user) {
    const u = await user.findByExternalId(profile.id, provider);

    if (u) {
      if (!u.providers[provider].token) {
        u.providers[provider].token = accessToken;
        u.providers[provider].refreshToken = refreshToken;
        u.providers[provider].expiresIn = expiresIn;
        u.providers[provider].displayName = profile.login.toLowerCase();
        u.providers[provider].avatar = profile.avatar;

        await user.save(u);
      }

      return u;
    } else {
      const newUser = await user.create({
        name: profile.login,
        avatar: profile.avatar,
        provider,
        providers: {
          [provider]: {
            id: profile.id,
            token: accessToken,
            refreshToken: refreshToken,
            expiresIn: expiresIn,
            avatar: profile.avatar,
            displayName: profile.login.toLowerCase()
          }
        }
      });

      return newUser;
    }
  } else {
    const u = req.user;

    u.providers = {
      ...u.providers,
      [provider]: {
        id: profile.id,
        token: accessToken,
        refreshToken: refreshToken,
        expiresIn: expiresIn,
        displayName: profile.login.toLowerCase(),
        avatar: profile.avatar
      }
    };

    await user.save(u);

    return u;
  }
};

export const updateToken = async (
  req: any,
  token: string,
  expiresIn: Date,
  provider: string
): Promise<boolean> => {
  const u = req.user;

  u.providers[provider].token = token;
  u.providers[provider].expiresIn = expiresIn;

  await user.save(u);

  return true;
};

export const unlinkProvider = async (
  req: any,
  provider: string
): Promise<boolean> => {
  const u = req.user;

  u.providers[provider].token = undefined;
  u.providers[provider].refreshToken = undefined;
  u.providers[provider].expiresIn = undefined;

  await user.save(u);

  return true;
};
