class LinksTransformer {
  constructor(links) {
    this.links = links
  }

  async element(element) {
    element.setInnerContent(
      this.links
        .map(
          ({ name, url, social, svg }) =>
            `<a href="${url}">${social ? svg : name}</a>`,
        )
        .join(''),
      { html: true },
    )
  }
}

class TitleTransformer {
  constructor(newTitle) {
    this.newTitle = newTitle
  }

  async element(element) {
    element.setInnerContent(this.newTitle)
  }
}

class ProfileTransformer {
  constructor() {}

  async element(element) {
    const style = element.getAttribute('style')

    if (style) {
      element.removeAttribute('style')
    }
  }
}

class ProfileNameTransformer {
  constructor(name) {
    this.name = name
  }

  async element(element) {
    element.setInnerContent(this.name)
  }
}

class ProfileAvatarTransformer {
  constructor(avatarImgUrl) {
    this.avatarImgUrl = avatarImgUrl
  }

  async element(element) {
    element.setAttribute('src', this.avatarImgUrl)
  }
}

class BodyClassTransformer {
  constructor(oldClassname, newClassname) {
    this.oldClassname = oldClassname
    this.newClassname = newClassname
  }

  async element(element) {
    const classAttr = element.getAttribute('class')
    if (classAttr) {
      element.setAttribute(
        'class',
        classAttr
          .split(' ')
          .map(classname =>
            classname === this.oldClassname ? this.newClassname : classname,
          )
          .join(' '),
      )
    } else {
      element.setAttribute('class', this.newClassname)
    }
  }
}

module.exports = {
  LinksTransformer,
  TitleTransformer,
  ProfileTransformer,
  ProfileNameTransformer,
  ProfileAvatarTransformer,
  BodyClassTransformer,
}
