import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Component from './react-md-component.jsx';

configure({ adapter: new Adapter() });

describe('<ReactMd />', () => {
  const file = '../example/README.md';
  let mountedComp = mount(<Component fileName={file} nested={false} />);

  beforeEach(done => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      text: () => Promise.resolve(`# Example
Hello world`)
    }));

    mountedComp.fetchFile = mountedComp.setState({ md: `# Example
Hello world`});

    done();
  });

  it('fetchFile should update state with file', () => {
    let component = new Component({fileName: '', nested: false});
    component.fetchFile(file).then(res => {
      expect(res).toBe(`# Example
Hello world`);
    });
  });

  it('should output the file with a top level h1', () => {
    expect(mountedComp.html()).toContain('<h1');
  });

  it('should output the file with a top level h2', () => {
    mountedComp.setProps({ fileName: file, nested: true });
    expect(mountedComp.html()).toContain('<h2');
  });

  it('should output a h1 from markdown string', () => {
    mountedComp = mount(<Component markdown="# hello world" />);
    expect(mountedComp.text()).toContain('hello world');
    expect(mountedComp.html()).toContain('<h1');
  });
});
