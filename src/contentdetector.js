const ContentDetector = function () {

  const families = [
    {
      type: "audio",
      matchers: [
        {
          name: "midi", mine: "audio/midi", extension: "midi", match: (buffer) => {
            return ((buffer.length) > 3 &&
              buffer[0] == 0x4D &&
              buffer[1] == 0x54 &&
              buffer[2] == 0x68 &&
              buffer[3] == 0x64)
          }
        },
        {
          name: "mp3", mine: "audio/mpeg", extension: "mp3", match: (buffer) => {
            return (buffer.length > 2 &&
              ((buffer[0] == 0x49 &&
                buffer[1] == 0x44 &&
                buffer[2] == 0x33) ||
                (buffer[0] == 0xFF &&
                  buffer[1] == 0xfb)))
          }
        },
        {
          name: "m4a", mine: "audio/m4a", extension: "m4a", match: (buffer) => {
            return (buffer.length > 10 &&
              ((buffer[4] == 0x66 &&
                buffer[5] == 0x74 &&
                buffer[6] == 0x79 &&
                buffer[7] == 0x70 &&
                buffer[8] == 0x4D &&
                buffer[9] == 0x34 &&
                buffer[10] == 0x41) ||
                (buffer[0] == 0x4D &&
                  buffer[1] == 0x34 &&
                  buffer[2] == 0x41 &&
                  buffer[3] == 0x20)))
          }
        },
        {
          name: "ogg", mine: "audio/ogg", extension: "ogg", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x4F &&
              buffer[1] == 0x67 &&
              buffer[2] == 0x67 &&
              buffer[3] == 0x53)
          }
        },
        {
          name: "wav", mine: "audio/x-wav", extension: "wav", match: (buffer) => {
            return (buffer.length > 11 &&
              buffer[0] == 0x52 &&
              buffer[1] == 0x49 &&
              buffer[2] == 0x46 &&
              buffer[3] == 0x46 &&
              buffer[8] == 0x57 &&
              buffer[9] == 0x41 &&
              buffer[10] == 0x56 &&
              buffer[11] == 0x45)
          }
        },
        {
          name: "amr", mine: "audio/amr", extension: "amr", match: (buffer) => {
            return (buffer.length > 11 &&
              buffer[0] == 0x23 &&
              buffer[1] == 0x21 &&
              buffer[2] == 0x41 &&
              buffer[3] == 0x4D &&
              buffer[4] == 0x52 &&
              buffer[5] == 0x0A)
          }
        }
      ]
    },
    {
      type: "archive",
      matchers: [
        {
          name: "epub", mine: "application/epub+zip", extension: "epub", match: (buffer) => {
            return (buffer.length > 57 &&
              buffer[0] == 0x50 && buffer[1] == 0x4B &&
              buffer[2] == 0x3 && buffer[3] == 0x4 &&
              buffer[30] == 0x6D && buffer[31] == 0x69 &&
              buffer[32] == 0x6D && buffer[33] == 0x65 &&
              buffer[34] == 0x74 && buffer[35] == 0x79 &&
              buffer[36] == 0x70 && buffer[37] == 0x65 &&
              buffer[38] == 0x61 && buffer[39] == 0x70 &&
              buffer[40] == 0x70 && buffer[41] == 0x6C &&
              buffer[42] == 0x69 && buffer[43] == 0x63 &&
              buffer[44] == 0x61 && buffer[45] == 0x74 &&
              buffer[46] == 0x69 && buffer[47] == 0x6F &&
              buffer[48] == 0x6E && buffer[49] == 0x2F &&
              buffer[50] == 0x65 && buffer[51] == 0x70 &&
              buffer[52] == 0x75 && buffer[53] == 0x62 &&
              buffer[54] == 0x2B && buffer[55] == 0x7A &&
              buffer[56] == 0x69 && buffer[57] == 0x70)
          }
        },
        {
          name: "zip", mine: "application/zip", extension: "zip", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x50 && buffer[1] == 0x4B &&
              (buffer[2] == 0x3 || buffer[2] == 0x5 ||
                buffer[2] == 0x7) &&
              (buffer[3] == 0x4 || buffer[3] == 0x6 ||
                buffer[3] == 0x8))
          }
        },
        {
          name: "tar", mine: "application/x-tar", extension: "tar", match: (buffer) => {
            return (buffer.length > 261 &&
              buffer[257] == 0x75 &&
              buffer[258] == 0x73 &&
              buffer[259] == 0x74 &&
              buffer[260] == 0x61 &&
              buffer[261] == 0x72)
          }
        },
        {
          name: "rar", mine: "application/x-rar-compressed", extension: "rar", match: (buffer) => {
            return (buffer.length > 6 &&
              buffer[0] == 0x52 &&
              buffer[1] == 0x61 &&
              buffer[2] == 0x72 &&
              buffer[3] == 0x21 &&
              buffer[4] == 0x1A &&
              buffer[5] == 0x7 &&
              (buffer[6] == 0x0 ||
                buffer[6] == 0x1))
          }
        },
        {
          name: "gz", mine: "application/gzip", extension: "gz", match: (buffer) => {
            return (buffer.length > 2 &&
              buffer[0] == 0x1F &&
              buffer[1] == 0x8B &&
              buffer[2] == 0x8)
          }
        },
        {
          name: "bz2", mine: "application/x-bzip2", extension: "bz2", match: (buffer) => {
            return (buffer.length > 5 &&
              buffer[0] == 0x37 &&
              buffer[1] == 0x7A &&
              buffer[2] == 0xBC &&
              buffer[3] == 0xAF &&
              buffer[4] == 0x27 &&
              buffer[5] == 0x1C)
          }
        },
        {
          name: "7z", mine: "application/x-7z-compressed", extension: "7z", match: (buffer) => {
            return (buffer.length > 2 &&
              buffer[0] == 0x42 &&
              buffer[1] == 0x5A &&
              buffer[2] == 0x68)
          }
        },
        {
          name: "pdf", mine: "application/pdf", extension: "pdf", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x25 &&
              buffer[1] == 0x50 &&
              buffer[2] == 0x44 &&
              buffer[3] == 0x46)
          }
        },
        {
          name: "exe", mine: "application/x-msdownload", extension: "exe", match: (buffer) => {
            return (buffer.length > 1 &&
              buffer[0] == 0x4D &&
              buffer[1] == 0x5A)
          }
        },
        {
          name: "swf", mine: "application/x-shockwave-flash", extension: "swf", match: (buffer) => {
            return (buffer.length > 2 &&
              (buffer[0] == 0x43 ||
                buffer[0] == 0x46) &&
              buffer[1] == 0x57 &&
              buffer[2] == 0x53)
          }
        },
        {
          name: "rtf", mine: "application/rtf", extension: "rtf", match: (buffer) => {
            return (buffer.length > 4 &&
              buffer[0] == 0x7B &&
              buffer[1] == 0x5C &&
              buffer[2] == 0x72 &&
              buffer[3] == 0x74 &&
              buffer[4] == 0x66)
          }
        },
        {
          name: "nes", mine: "application/x-nintendo-nes-rom", extension: "nes", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x4E &&
              buffer[1] == 0x45 &&
              buffer[2] == 0x53 &&
              buffer[3] == 0x1A)
          }
        },
        {
          name: "crx", mine: "application/x-google-chrome-extension", extension: "crx", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x43 &&
              buffer[1] == 0x72 &&
              buffer[2] == 0x32 &&
              buffer[3] == 0x34)
          }
        },
        {
          name: "cab", mine: "application/vnd.ms-cab-compressed", extension: "cab", match: (buffer) => {
            return (buffer.length > 3 &&
              ((buffer[0] == 0x4D &&
                buffer[1] == 0x53 &&
                buffer[2] == 0x43 &&
                buffer[3] == 0x46) ||
                (buffer[0] == 0x49 &&
                  buffer[1] == 0x53 &&
                  buffer[2] == 0x63 &&
                  buffer[3] == 0x28)))
          }
        },
        {
          name: "oet", mine: "application/octet-stream", extension: "oet", match: (buffer) => {
            return (buffer.length > 35 &&
              buffer[34] == 0x4C &&
              buffer[35] == 0x50 &&
              ((buffer[8] == 0x02 &&
                buffer[9] == 0x00 &&
                buffer[10] == 0x01) ||
                (buffer[8] == 0x01 &&
                  buffer[9] == 0x00 &&
                  buffer[10] == 0x00) ||
                (buffer[8] == 0x02 &&
                  buffer[9] == 0x00 &&
                  buffer[10] == 0x02)))
          }
        },
        {
          name: "ps", mine: "application/postscript", extension: "ps", match: (buffer) => {
            return (buffer.length > 1 &&
              buffer[0] == 0x25 &&
              buffer[1] == 0x21)
          }
        },
        {
          name: "xz", mine: "application/x-xz", extension: "xz", match: (buffer) => {
            return (buffer.length > 5 &&
              buffer[0] == 0xFD &&
              buffer[1] == 0x37 &&
              buffer[2] == 0x7A &&
              buffer[3] == 0x58 &&
              buffer[4] == 0x5A &&
              buffer[5] == 0x00)
          }
        },
        {
          name: "sqlite", mine: "application/x-sqlite3", extension: "sqlite", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x53 &&
              buffer[1] == 0x51 &&
              buffer[2] == 0x4C &&
              buffer[3] == 0x69)
          }
        },
        {
          name: "deb", mine: "application/x-deb", extension: "deb", match: (buffer) => {
            return (buffer.length > 20 &&
              buffer[0] == 0x21 &&
              buffer[1] == 0x3C &&
              buffer[2] == 0x61 &&
              buffer[3] == 0x72 &&
              buffer[4] == 0x63 &&
              buffer[5] == 0x68 &&
              buffer[6] == 0x3E &&
              buffer[7] == 0x0A &&
              buffer[8] == 0x64 &&
              buffer[9] == 0x65 &&
              buffer[10] == 0x62 &&
              buffer[11] == 0x69 &&
              buffer[12] == 0x61 &&
              buffer[13] == 0x6E &&
              buffer[14] == 0x2D &&
              buffer[15] == 0x62 &&
              buffer[16] == 0x69 &&
              buffer[17] == 0x6E &&
              buffer[18] == 0x61 &&
              buffer[19] == 0x72 &&
              buffer[20] == 0x79)
          }
        },
        {
          name: "ar", mine: "application/x-unix-archive", extension: "ar", match: (buffer) => {
            return (buffer.length > 6 &&
              buffer[0] == 0x21 &&
              buffer[1] == 0x3C &&
              buffer[2] == 0x61 &&
              buffer[3] == 0x72 &&
              buffer[4] == 0x63 &&
              buffer[5] == 0x68 &&
              buffer[6] == 0x3E)
          }
        },
        {
          name: "z", mine: "application/x-compress", extension: "z", match: (buffer) => {
            return (buffer.length > 1 &&
              ((buffer[0] == 0x1F &&
                buffer[1] == 0xA0) ||
                (buffer[0] == 0x1F &&
                  buffer[1] == 0x9D)))
          }
        },
        {
          name: "lz", mine: "application/x-lzip", extension: "lz", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x4C &&
              buffer[1] == 0x5A &&
              buffer[2] == 0x49 &&
              buffer[3] == 0x50)
          }
        }
      ]
    },
    {
      type: "font",
      matchers: [
        {
          name: "woff", mine: "application/font-woff", extension: "woff", match: (buffer) => {
            return (buffer.length > 7 &&
              buffer[0] == 0x77 &&
              buffer[1] == 0x4F &&
              buffer[2] == 0x46 &&
              buffer[3] == 0x46 &&
              buffer[4] == 0x00 &&
              buffer[5] == 0x01 &&
              buffer[6] == 0x00 &&
              buffer[7] == 0x00)
          }
        },
        {
          name: "woff2", mine: "application/font-woff", extension: "woff2", match: (buffer) => {
            return (buffer.length > 7 &&
              buffer[0] == 0x77 &&
              buffer[1] == 0x4F &&
              buffer[2] == 0x46 &&
              buffer[3] == 0x32 &&
              buffer[4] == 0x00 &&
              buffer[5] == 0x01 &&
              buffer[6] == 0x00 &&
              buffer[7] == 0x00)
          }
        },
        {
          name: "ttf", mine: "application/font-sfnt", extension: "ttf", match: (buffer) => {
            return (buffer.length > 4 &&
              buffer[0] == 0x00 &&
              buffer[1] == 0x01 &&
              buffer[2] == 0x00 &&
              buffer[3] == 0x00 &&
              buffer[4] == 0x00)
          }
        },
        {
          name: "otf", mine: "application/font-sfnt", extension: "otf", match: (buffer) => {
            return (buffer.length > 4 &&
              buffer[0] == 0x4F &&
              buffer[1] == 0x54 &&
              buffer[2] == 0x54 &&
              buffer[3] == 0x4F &&
              buffer[4] == 0x00)
          }
        }
      ]
    },
    {
      type: "image",
      matchers: [
        {
          name: "jpg", mine: "image/jpeg", extension: "jpg", match: (buffer) => {
            return (buffer.length > 2 &&
              buffer[0] == 0xFF &&
              buffer[1] == 0xD8 &&
              buffer[2] == 0xFF)
          }
        },
        {
          name: "png", mine: "image/png", extension: "png", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x89 &&
              buffer[1] == 0x50 &&
              buffer[2] == 0x4E &&
              buffer[3] == 0x47)
          }
        },
        {
          name: "gif", mine: "image/gif", extension: "gif", match: (buffer) => {
            return (buffer.length > 2 &&
              buffer[0] == 0x47 &&
              buffer[1] == 0x49 &&
              buffer[2] == 0x46)
          }
        },
        {
          name: "webp", mine: "image/webp", extension: "webp", match: (buffer) => {
            return (buffer.length > 11 &&
              buffer[8] == 0x57 &&
              buffer[9] == 0x45 &&
              buffer[10] == 0x42 &&
              buffer[11] == 0x50)
          }
        },
        {
          name: "cr2", mine: "image/x-canon-cr2", extension: "cr2", match: (buffer) => {
            return (buffer.length > 9 &&
              ((buffer[0] == 0x49 && buffer[1] == 0x49 &&
                buffer[2] == 0x2A && buffer[3] == 0x0) ||
                (buffer[0] == 0x4D && buffer[1] == 0x4D &&
                  buffer[2] == 0x0 && buffer[3] == 0x2A)) &&
              buffer[8] == 0x43 && buffer[9] == 0x52)
          }
        },
        {
          name: "tif", mine: "image/tiff", extension: "tif", match: (buffer) => {
            return (buffer.length > 3 &&
              ((buffer[0] == 0x49 && buffer[1] == 0x49 &&
                buffer[2] == 0x2A && buffer[3] == 0x0) ||
                (buffer[0] == 0x4D && buffer[1] == 0x4D &&
                  buffer[2] == 0x0 && buffer[3] == 0x2A)))
          }
        },
        {
          name: "bmp", mine: "image/bmp", extension: "bmp", match: (buffer) => {
            return (buffer.length > 1 &&
              buffer[0] == 0x42 &&
              buffer[1] == 0x4D)
          }
        },
        {
          name: "jxr", mine: "image/vnd.ms-photo", extension: "jxr", match: (buffer) => {
            return (buffer.length > 2 &&
              buffer[0] == 0x49 &&
              buffer[1] == 0x49 &&
              buffer[2] == 0xBC)
          }
        },
        {
          name: "psd", mine: "image/vnd.adobe.photoshop", extension: "psd", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x38 &&
              buffer[1] == 0x42 &&
              buffer[2] == 0x50 &&
              buffer[3] == 0x53)
          }
        },
        {
          name: "ico", mine: "image/x-icon", extension: "ico", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x00 &&
              buffer[1] == 0x00 &&
              buffer[2] == 0x01 &&
              buffer[3] == 0x00)
          }
        },
        {
          name: "svg", mine: "image/svg+xml", extension: "svg", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 60 &&
              buffer[1] == 115 &&
              buffer[2] == 118 &&
              buffer[3] == 103)
          }
        }
      ]
    },
    {
      type: "video",
      matchers: [
        {
          name: "mp4", mine: "video/mp4", extension: "mp4", match: (buffer) => {
            return (buffer.length > 27 &&
              (buffer[0] == 0x0 && buffer[1] == 0x0 &&
                buffer[2] == 0x0 &&
                ((buffer[3] == 0x18 ||
                  buffer[3] == 0x20) &&
                  buffer[4] == 0x66 &&
                  buffer[5] == 0x74 && buffer[6] == 0x79 &&
                  buffer[7] == 0x70) ||
                (buffer[0] == 0x33 && buffer[1] == 0x67 &&
                  buffer[2] == 0x70 && buffer[3] == 0x35) ||
                (buffer[0] == 0x0 && buffer[1] == 0x0 &&
                  buffer[2] == 0x0 && buffer[3] == 0x1C &&
                  buffer[4] == 0x66 && buffer[5] == 0x74 &&
                  buffer[6] == 0x79 && buffer[7] == 0x70 &&
                  buffer[8] == 0x6D && buffer[9] == 0x70 &&
                  buffer[10] == 0x34 && buffer[11] == 0x32 &&
                  buffer[16] == 0x6D && buffer[17] == 0x70 &&
                  buffer[18] == 0x34 && buffer[19] == 0x31 &&
                  buffer[20] == 0x6D && buffer[21] == 0x70 &&
                  buffer[22] == 0x34 && buffer[23] == 0x32 &&
                  buffer[24] == 0x69 && buffer[25] == 0x73 &&
                  buffer[26] == 0x6F && buffer[27] == 0x6D)))
          }
        },
        {
          name: "m4v", mine: "video/x-m4v", extension: "m4v", match: (buffer) => {
            return (buffer.length > 10 &&
              buffer[0] == 0x0 && buffer[1] == 0x0 &&
              buffer[2] == 0x0 && buffer[3] == 0x1C &&
              buffer[4] == 0x66 && buffer[5] == 0x74 &&
              buffer[6] == 0x79 && buffer[7] == 0x70 &&
              buffer[8] == 0x4D && buffer[9] == 0x34 &&
              buffer[10] == 0x56)
          }
        },
        {
          name: "mkv", mine: "video/x-matroska", extension: "mkv", match: (buffer) => {
            return ((buffer.length > 15 &&
              buffer[0] == 0x1A && buffer[1] == 0x45 &&
              buffer[2] == 0xDF && buffer[3] == 0xA3 &&
              buffer[4] == 0x93 && buffer[5] == 0x42 &&
              buffer[6] == 0x82 && buffer[7] == 0x88 &&
              buffer[8] == 0x6D && buffer[9] == 0x61 &&
              buffer[10] == 0x74 && buffer[11] == 0x72 &&
              buffer[12] == 0x6F && buffer[13] == 0x73 &&
              buffer[14] == 0x6B && buffer[15] == 0x61) ||
              (buffer.length > 38 &&
                buffer[31] == 0x6D && buffer[32] == 0x61 &&
                buffer[33] == 0x74 && buffer[34] == 0x72 &&
                buffer[35] == 0x6f && buffer[36] == 0x73 &&
                buffer[37] == 0x6B && buffer[38] == 0x61))
          }
        },
        {
          name: "webm", mine: "video/webm", extension: "webm", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x1A &&
              buffer[1] == 0x45 &&
              buffer[2] == 0xDF &&
              buffer[3] == 0xA3)
          }
        },
        {
          name: "mov", mine: "video/quicktime", extension: "mov", match: (buffer) => {
            return (buffer.length > 7 &&
              buffer[0] == 0x0 &&
              buffer[1] == 0x0 &&
              buffer[2] == 0x0 &&
              buffer[3] == 0x14 &&
              buffer[4] == 0x66 &&
              buffer[5] == 0x74 &&
              buffer[6] == 0x79 &&
              buffer[7] == 0x70)
          }
        },
        {
          name: "avi", mine: "video/x-msvideo", extension: "avi", match: (buffer) => {
            return (buffer.length > 10 &&
              buffer[0] == 0x52 &&
              buffer[1] == 0x49 &&
              buffer[2] == 0x46 &&
              buffer[3] == 0x46 &&
              buffer[8] == 0x41 &&
              buffer[9] == 0x56 &&
              buffer[10] == 0x49)
          }
        },
        {
          name: "wmv", mine: "video/x-ms-wmv", extension: "wmv", match: (buffer) => {
            return (buffer.length > 9 &&
              buffer[0] == 0x30 &&
              buffer[1] == 0x26 &&
              buffer[2] == 0xB2 &&
              buffer[3] == 0x75 &&
              buffer[4] == 0x8E &&
              buffer[5] == 0x66 &&
              buffer[6] == 0xCF &&
              buffer[7] == 0x11 &&
              buffer[8] == 0xA6 &&
              buffer[9] == 0xD9)
          }
        },
        {
          name: "flv", mine: "video/x-flv", extension: "flv", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x46 &&
              buffer[1] == 0x4C &&
              buffer[2] == 0x56 &&
              buffer[3] == 0x01)
          }
        },
        {
          name: "mpg", mine: "video/mpeg", extension: "mpg", match: (buffer) => {
            return (buffer.length > 3 &&
              buffer[0] == 0x0 &&
              buffer[1] == 0x0 &&
              buffer[2] == 0x1 &&
              buffer[3] >= 0xb0 &&
              buffer[3] <= 0xbf)
          }
        }
      ]
    }];

  return {
    findAllMatches: (byteArray) => {
      const result = [];
      families.forEach((family) => {
        family.matchers.forEach((matcher) => {
          if (matcher.match(byteArray)) {
            result.push({
              type: family.type,
              name: matcher.name,
              mimeType: matcher.mine,
              ext: matcher.extension
            })
          }
        })
      })
      return result;
    },
    getGenericMimeType: () => {
      return "application/octet-stream";
    }
  }
}();
