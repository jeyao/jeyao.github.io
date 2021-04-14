import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import useWindowScroll from 'react-use/lib/useWindowScroll';
import useWindowSize from 'react-use/lib/useWindowSize';

import slug from '../../../util/slug';

import { Wrapper, Container } from './styles';

export default function TableOfContents({ headings, disableTOC, contentRef }) {
  const { y } = useWindowScroll();
  const theme = useTheme();
  const { width, height } = useWindowSize();
  const [offsets, setOffsets] = useState([]);

  const isMobile = width <= 1200;

  useEffect(() => {
    if (!isMobile || disableTOC) {
      const allHeadings = contentRef.current?.querySelectorAll(`h2, h3`);

      setOffsets(
        allHeadings &&
          Array.from(allHeadings)
            .map((heading) => {
              const anchor = heading.querySelector(`a`);
              if (!anchor) return {};

              return {
                id: heading.id,
                offset: heading.offsetTop + anchor.offsetTop,
              };
            })
            .filter(Boolean),
      );
    }
  }, [width, height, contentRef, isMobile, disableTOC]);

  const activeHeading = useMemo(() => {
    if (!isMobile || disableTOC) {
      const windowOffset = height / 2;
      const scrollTop = y + windowOffset;

      if (offsets) {
        for (let i = offsets.length - 1; i >= 0; i -= 1) {
          const { id, offset } = offsets[i];
          if (scrollTop >= offset) {
            return id;
          }
        }
      }
    }

    return null;
  }, [offsets, height, y, isMobile, disableTOC]);

  if (!disableTOC) {
    return (
      <Wrapper>
        <Container>
          <h2
              style={{
                  letterSpacing: .5,
                  color: '#030852',
              }}
          >
            TABLE OF CONTENTS
          </h2>
          <nav
            style={{
              borderLeft:'1px solid #d6e4ff',
              marginLeft:'.5rem',
              paddingLeft: '1rem',
            }}
          >
            <ul>
              {headings
                .filter((heading) => heading.depth === 2 || heading.depth === 3)
                .map((heading) => {
                  const headingSlug = slug(heading.value);

                  return (
                    <li
                      key={heading.value}
                      style={{
                        fontWeight:"bolder",
                        marginLeft: heading.depth === 3 ? `8px`:null,
                      }}
                    >
                      <a
                        href={`#${headingSlug}`}
                        style={{
                          color:
                            activeHeading === headingSlug
                              ? theme.colors.primary
                              : theme.colors.text,
                        }}
                      >
                        {heading.value}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </Container>
      </Wrapper>
    );
  }

  return <Wrapper />;
}

TableOfContents.propTypes = {
  headings: PropTypes.array,
  disableTOC: PropTypes.bool.isRequired,
  contentRef: PropTypes.shape({ current: PropTypes.object }).isRequired,
};

TableOfContents.defaultProps = {
  headings: null,
};
