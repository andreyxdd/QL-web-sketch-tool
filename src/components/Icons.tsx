import React from 'react';
import { BsGrid3X3, BsPencil } from 'react-icons/bs';

const IconsSize = 30;

export const IconGrid = (): JSX.Element => (
  <BsGrid3X3 style={{ height: IconsSize, width: IconsSize }} />
);

export const IconSketch = (): JSX.Element => (
  <BsPencil style={{ height: IconsSize, width: IconsSize }} />
);

export const IconXYZ = (): JSX.Element => (
  <img
    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAACz0lEQVR4nO2bsWoUURSGPzfRwkJLbQRBsEuXJha2PoFtQAtBsEmjphOx0VfQytJCSRELJY2LBl9AQwolCqJYKYqoJGsxd3XY7O7szjn33pn1/2BhcjK55+w//z33ZmcHhBBCCCGEEDPHS2BzSHwD6AErpdhKiG0kqKs19MJrkDMh/h44BBwEdkLsbLLqWsAoAQEeh99dAC6G4/VEdbWGcQIuAnvAFvA6HC8mqqs1jBMQ4FHpnIdJKmoZVQIulM5ZSFJRy6gScNJzotHJlXhWkIBG5nMX4MCBnMnlQCMS0IgENCIBjUhAIxLQiAQ0IgGNSEAjEtCIBDQiAY1IQCMS0IgENCIBjUhAIxLQiLeAz4Gu85ieuNfnLeAeGW8xTkDT69uH9Ypb7/lGnxGxe2DuK547vzvTOmJaBybvwalX4diOmDnHVVHlmCoHZl/1c+8DrY757xxXxaCjBh2Y3XGDTOrA3piXJ1WO8nbcWhjvZil2JcTWHPOMFO+NZ5ISc8ByKc9yiHlzCvgBfAdOAEeBz+HnkxHyAXAO2AV+A0vOY3eA8xTfex52sS7h/42yW2H8+8DtcLzqnOMvx4FPIck1x3H7jtvmn2DbITYq7uXIw8A7ivbwC3hF8eiEOx3gKcWbeILPCj5OuLka59XlRmncyw7jDWU1JPhI4UQLdQWJIeQR4AOFA/uPTbg7cInC3rsUPbAu0wowatviKeSd8Pd3gXvh+PqUY1TyFts2pu4b7gLPIozb5zTwE/gCHKOYWV+BbxSrsht194HDVtUYq2ndPOvh3KulWL9VPXCsb2pSCdeUvG54N/m6/7qNq6ORQsbaZlT1QEtdjRCyLVOmcXU2rqAJyV536ikR6+OreRJP7Vy9xNoDq0gm5GbsBJkZJuQLzwRdisfqZ024QfpCbhHX+clo3Ef4g+S+qVSFbhoJ0WrUA42oBwohhBBCCCHEPv4ADks2m9UOklQAAAAASUVORK5CYII='
    alt='xyz-coordinate-system-icon'
    width={IconsSize}
    height={IconsSize}
  />
);
