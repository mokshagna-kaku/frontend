import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getLinks, saveLinks } from '../utils/storage';
import { Typography, Button, Box } from '@mui/material';
import { useLogging } from '../middleware/LoggingProvider';

const attemptGetGeo = (timeout = 1500) => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);
    let called = false;
    const onSuccess = (pos) => {
      if (called) return;
      called = true;
      resolve({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      });
    };
    const onError = (err) => {
      if (called) return;
      called = true;
      if (err.code === 1) resolve('denied');
      else resolve(null);
    };
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      maximumAge: 60_000,
      timeout,
    });
    // fallback timeout
    setTimeout(() => {
      if (!called) {
        called = true;
        resolve(null);
      }
    }, timeout + 200);
  });
};

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const [status, setStatus] = useState('checking');
  const { log } = useLogging();

  useEffect(() => {
    const doRedirect = async () => {
      const links = getLinks();
      const link = links.find((l) => l.shortcode === shortcode);
      if (!link) {
        setStatus('notfound');
        log('error', 'Redirect attempted to missing shortcode', { shortcode });
        return;
      }
      const now = Date.now();
      if (link.expiresAt && now > link.expiresAt) {
        setStatus('expired');
        log('event', 'Redirect attempted to expired shortcode', { shortcode });
        return;
      }

      setStatus('redirecting');
      const geo = await attemptGetGeo(1500);
      const click = {
        ts: Date.now(),
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        geo,
      };

      const updatedLinks = links.map((l) =>
        l.shortcode === shortcode
          ? { ...l, clicks: [...(l.clicks || []), click] }
          : l
      );
      saveLinks(updatedLinks);
      log('event', 'Redirect recorded', { shortcode, click });

      // Perform the actual redirect
      const target = link.originalUrl;
      setTimeout(() => {
        window.location.href = target;
      }, 100); // small delay so storage updates
    };

    doRedirect();
  }, [shortcode, log]);

  if (status === 'checking' || status === 'redirecting') {
    return <Typography>Redirecting…</Typography>;
  }

  if (status === 'notfound') {
    return (
      <Box>
        <Typography variant="h6">Shortcode not found</Typography>
        <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Box>
    );
  }

  if (status === 'expired') {
    return (
      <Box>
        <Typography variant="h6">This link has expired</Typography>
        <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Box>
    );
  }

  return null;
};

export default RedirectHandler;
