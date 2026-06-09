const { loadHTML } = require('./helpers');

describe('index.html – Hotel Survey Form', () => {
  let doc;

  beforeEach(() => {
    doc = loadHTML('index.html');
  });

  // ───────── Page-level structure ─────────

  describe('Page structure', () => {
    test('sets lang attribute to Vietnamese', () => {
      const html = doc.querySelector('html');
      expect(html).not.toBeNull();
      expect(html.getAttribute('lang')).toBe('vi');
    });

    test('has a <title> element with survey text', () => {
      const title = doc.querySelector('title');
      expect(title).not.toBeNull();
      expect(title.textContent).toContain('khảo sát');
    });

    test('has a <body> element', () => {
      expect(doc.querySelector('body')).not.toBeNull();
    });

    test('has a main heading (h1)', () => {
      const h1 = doc.querySelector('h1');
      expect(h1).not.toBeNull();
      expect(h1.textContent).toContain('Phiếu khảo sát');
    });

    test('has section headings (h2) for survey parts', () => {
      const h2s = doc.querySelectorAll('h2');
      expect(h2s.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ───────── Personal Information section ─────────

  describe('Personal information section', () => {
    test('contains a name input field', () => {
      const nameInput = doc.querySelector('input[name="tên"]');
      expect(nameInput).not.toBeNull();
      expect(nameInput.type).toBe('text');
    });

    test('name field is required', () => {
      const nameInput = doc.querySelector('input[name="tên"]');
      expect(nameInput.required).toBe(true);
    });

    test('name field has a placeholder', () => {
      const nameInput = doc.querySelector('input[name="tên"]');
      expect(nameInput.placeholder).toBeTruthy();
    });

    test('contains an age input field of type number', () => {
      const ageInput = doc.querySelector('input[name="tuổi"]');
      expect(ageInput).not.toBeNull();
      expect(ageInput.type).toBe('number');
    });

    test('age field has min and max constraints', () => {
      const ageInput = doc.querySelector('input[name="tuổi"]');
      expect(ageInput.getAttribute('min')).toBe('10');
      expect(ageInput.getAttribute('max')).toBe('100');
    });

    test('age field is required', () => {
      const ageInput = doc.querySelector('input[name="tuổi"]');
      expect(ageInput.required).toBe(true);
    });

    test('contains a gender select dropdown', () => {
      const genderSelect = doc.querySelector('select#giới-tính');
      expect(genderSelect).not.toBeNull();
    });

    test('gender dropdown has three options (Nam, Nữ, Khác)', () => {
      const genderSelect = doc.querySelector('select#giới-tính');
      const options = genderSelect.querySelectorAll('option');
      expect(options.length).toBe(3);

      const texts = Array.from(options).map((o) => o.textContent.trim());
      expect(texts).toContain('Nam');
      expect(texts).toContain('Nữ');
      expect(texts).toContain('Khác');
    });

    test('each personal-info field has a corresponding label', () => {
      const nameLabel = doc.querySelector('label[for="tên"]');
      const ageLabel = doc.querySelector('label[for="tuổi"]');
      const genderLabel = doc.querySelector('label[for="giới-tính"]');

      expect(nameLabel).not.toBeNull();
      expect(ageLabel).not.toBeNull();
      expect(genderLabel).not.toBeNull();
    });
  });

  // ───────── Booking experience section ─────────

  describe('Booking experience section', () => {
    test('contains a booking experience dropdown', () => {
      const label = doc.querySelector('label#đặt-phòng');
      expect(label).not.toBeNull();
    });

    test('booking dropdown has five rating options', () => {
      // The booking dropdown options share id="đặt-phòng"
      const options = doc.querySelectorAll('option#đặt-phòng');
      expect(options.length).toBe(5);
    });

    test('"Tốt" is selected by default in booking dropdown', () => {
      const selected = doc.querySelector('option#đặt-phòng[selected]');
      expect(selected).not.toBeNull();
      expect(selected.textContent.trim()).toBe('Tốt');
    });

    test('has a text input for describing booking difficulties', () => {
      const input = doc.querySelector('input[name="Trải nghiệm đặt phòng"]');
      expect(input).not.toBeNull();
      expect(input.type).toBe('text');
    });
  });

  // ───────── Dining experience section ─────────

  describe('Dining experience section', () => {
    test('contains a dining experience dropdown', () => {
      const select = doc.querySelector('select#thức-ăn');
      expect(select).not.toBeNull();
    });

    test('dining dropdown has five rating options', () => {
      const options = doc.querySelectorAll('option#thức-ăn');
      expect(options.length).toBe(5);
    });

    test('"Tốt" is selected by default in dining dropdown', () => {
      const selected = doc.querySelector('option#thức-ăn[selected]');
      expect(selected).not.toBeNull();
      expect(selected.textContent.trim()).toBe('Tốt');
    });

    test('has a text input for describing dining difficulties', () => {
      const input = doc.querySelector('input[name="Trải nghiệm ăn uống"]');
      expect(input).not.toBeNull();
      expect(input.type).toBe('text');
    });
  });

  // ───────── Amenities rating table ─────────

  describe('Amenities rating table', () => {
    test('has a table with id "tiện-nghi"', () => {
      const table = doc.querySelector('table#tiện-nghi');
      expect(table).not.toBeNull();
    });

    test('table has a caption "Tiện nghi khách sạn"', () => {
      const caption = doc.querySelector('table#tiện-nghi caption');
      expect(caption).not.toBeNull();
      expect(caption.textContent).toBe('Tiện nghi khách sạn');
    });

    test('table includes six amenity categories', () => {
      const headers = doc.querySelectorAll('table#tiện-nghi th');
      expect(headers.length).toBe(6);

      const expected = [
        'Phòng ngủ',
        'Phòng khách',
        'Hồ bơi',
        'Suối nước nóng',
        'Phòng gym',
        'Thiên nhiên',
      ];
      const actual = Array.from(headers).map((th) => th.textContent.trim());
      expect(actual).toEqual(expected);
    });

    test('each amenity row has exactly 5 radio buttons', () => {
      const rows = doc.querySelectorAll('table#tiện-nghi tbody tr');
      // First row is the header row (td-based), skip it
      const amenityRows = Array.from(rows).filter(
        (row) => row.querySelector('th') !== null
      );

      amenityRows.forEach((row) => {
        const radios = row.querySelectorAll('input[type="radio"]');
        expect(radios.length).toBe(5);
      });
    });

    test('radio buttons in same row share a name attribute', () => {
      const radioNames = [
        'chất lượng phòng ngủ',
        'chất lượng phòng khách',
        'chất lượng hồ bơi',
        'chất lượng suối nước nóng',
        'chất lượng phòng gym',
        'chất lượng thiên nhiên',
      ];

      radioNames.forEach((name) => {
        const radios = doc.querySelectorAll(`input[type="radio"][name="${name}"]`);
        expect(radios.length).toBe(5);
      });
    });

    test('header row defines five rating levels', () => {
      const firstRow = doc.querySelector('table#tiện-nghi tbody tr');
      const cells = firstRow.querySelectorAll('td');
      const ratingTexts = Array.from(cells)
        .map((td) => td.textContent.trim())
        .filter(Boolean);

      expect(ratingTexts).toEqual([
        'Rất tốt',
        'Tốt',
        'Bình thường',
        'Kém',
        'Rất kém',
      ]);
    });
  });

  // ───────── Forms and navigation ─────────

  describe('Forms and navigation', () => {
    test('forms point to "Thông tin.html"', () => {
      const forms = doc.querySelectorAll('form');
      forms.forEach((form) => {
        expect(form.getAttribute('action')).toBe('Thông tin.html');
      });
    });

    test('page has at least two <form> elements', () => {
      const forms = doc.querySelectorAll('form');
      expect(forms.length).toBeGreaterThanOrEqual(2);
    });

    test('forms use fieldsets with legends', () => {
      const fieldsets = doc.querySelectorAll('fieldset');
      expect(fieldsets.length).toBeGreaterThanOrEqual(2);

      fieldsets.forEach((fs) => {
        const legend = fs.querySelector('legend');
        expect(legend).not.toBeNull();
        expect(legend.textContent.trim()).toBeTruthy();
      });
    });
  });

  // ───────── Accessibility ─────────

  describe('Accessibility', () => {
    test('navigation has aria-hidden="true"', () => {
      const nav = doc.querySelector('nav');
      expect(nav).not.toBeNull();
      expect(nav.getAttribute('aria-hidden')).toBe('true');
    });

    test('all text inputs have an associated label', () => {
      const textInputs = doc.querySelectorAll('input[type="text"]');
      textInputs.forEach((input) => {
        const id = input.getAttribute('id');
        if (id) {
          const label = doc.getElementById(id);
          // Either the label shares the same id or has a for= attribute
          expect(label).not.toBeNull();
        }
      });
    });

    test('charset is set to UTF-8', () => {
      const meta = doc.querySelector('meta[charset]');
      expect(meta).not.toBeNull();
      expect(meta.getAttribute('charset')).toBe('UTF-8');
    });
  });
});
