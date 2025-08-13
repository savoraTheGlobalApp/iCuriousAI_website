const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, email, role, message } = data;

    // Validate required fields
    if (!email) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Email is required' }) 
      };
    }

    // Use anon key (safe for public use)
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // Insert into your contact_form table
    const { data: result, error } = await supabase
      .from('contact_form')
      .insert({
        name: name || null,
        email: email,
        role: role || null,
        message: message || null,
        submitted_at: new Date().toISOString()
      })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: 'Database error occurred' }) 
      };
    }

    return { 
      statusCode: 200, 
      body: JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        id: result[0]?.id 
      }) 
    };

  } catch (error) {
    console.error('Function error:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Internal server error' }) 
    };
  }
};
